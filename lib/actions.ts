"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { createToken, setSessionCookie, clearSessionCookie } from "./auth";
import bcrypt from "bcryptjs";

// ─── Auth Actions ─────────────────────────────────────────

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return { success: false, error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  await setSessionCookie(token);

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return { success: true, role: user.role };
}

export async function logoutAdmin() {
  await clearSessionCookie();
  return { success: true };
}

// ─── Lead Actions ─────────────────────────────────────────

export async function createLead(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      qualification: formData.get("qualification") as string,
      discipline: formData.get("discipline") as string,
      state: formData.get("state") as string,
      modePreference: formData.get("modePreference") as string,
      budgetRange: formData.get("budgetRange") as string,
      isUrgent: formData.get("isUrgent") === "true",
      preferredCallTime: formData.get("preferredCallTime") as string,
      source: (formData.get("source") as string) || "ORGANIC",
      status: "NEW",
      priority: "MEDIUM",
    };

    const lead = await prisma.lead.create({ data });

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "LEAD_CREATED",
        entityType: "lead",
        entityId: lead.id,
        details: { name: lead.name, email: lead.email },
      },
    });

    revalidatePath("/dashboard/leads");
    return { success: true, lead };
  } catch (error) {
    console.error("Create lead error:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function updateLeadStatus(leadId: string, status: string, notes?: string) {
  try {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status, notes: notes || undefined },
    });

    await prisma.activityLog.create({
      data: {
        action: "LEAD_STATUS_UPDATED",
        entityType: "lead",
        entityId: leadId,
        details: { status, notes },
      },
    });

    revalidatePath("/dashboard/leads");
    return { success: true, lead };
  } catch (error) {
    return { success: false, error: "Failed to update lead" };
  }
}

export async function assignLead(leadId: string, counsellorId: string) {
  try {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { assignedToId: counsellorId },
    });

    revalidatePath("/dashboard/leads");
    return { success: true, lead };
  } catch (error) {
    return { success: false, error: "Failed to assign lead" };
  }
}

// ─── University Actions ───────────────────────────────────

export async function createUniversity(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      shortName: formData.get("shortName") as string,
      description: formData.get("description") as string,
      about: formData.get("about") as string,
      location: formData.get("location") as string,
      state: formData.get("state") as string,
      website: formData.get("website") as string,
      ugcApproved: formData.get("ugcApproved") === "true",
      naacGrade: formData.get("naacGrade") as string,
      nirfRank: formData.get("nirfRank") ? parseInt(formData.get("nirfRank") as string) : null,
      isPartner: formData.get("isPartner") === "true",
      tieUpStatus: (formData.get("tieUpStatus") as string) || "PENDING",
    };

    const university = await prisma.university.create({ data });
    revalidatePath("/dashboard/universities");
    revalidatePath("/universities");
    return { success: true, university };
  } catch (error) {
    return { success: false, error: "Failed to create university" };
  }
}

export async function updateUniversity(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      shortName: formData.get("shortName") as string,
      description: formData.get("description") as string,
      about: formData.get("about") as string,
      location: formData.get("location") as string,
      state: formData.get("state") as string,
      website: formData.get("website") as string,
      ugcApproved: formData.get("ugcApproved") === "true",
      naacGrade: formData.get("naacGrade") as string,
      nirfRank: formData.get("nirfRank") ? parseInt(formData.get("nirfRank") as string) : null,
      isPartner: formData.get("isPartner") === "true",
      tieUpStatus: formData.get("tieUpStatus") as string,
      isActive: formData.get("isActive") === "true",
    };

    const university = await prisma.university.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/universities");
    revalidatePath("/universities");
    return { success: true, university };
  } catch (error) {
    return { success: false, error: "Failed to update university" };
  }
}

// ─── Service Actions ──────────────────────────────────────

export async function createService(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      shortDesc: formData.get("shortDesc") as string,
      features: JSON.stringify((formData.get("features") as string).split("\n").filter(Boolean)),
      priceMin: parseInt(formData.get("priceMin") as string),
      priceMax: parseInt(formData.get("priceMax") as string),
      isActive: formData.get("isActive") === "true",
      isPopular: formData.get("isPopular") === "true",
      displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
    };

    const service = await prisma.service.create({ data });
    revalidatePath("/dashboard/services");
    revalidatePath("/services");
    return { success: true, service };
  } catch (error) {
    return { success: false, error: "Failed to create service" };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      shortDesc: formData.get("shortDesc") as string,
      features: JSON.stringify((formData.get("features") as string).split("\n").filter(Boolean)),
      priceMin: parseInt(formData.get("priceMin") as string),
      priceMax: parseInt(formData.get("priceMax") as string),
      isActive: formData.get("isActive") === "true",
      isPopular: formData.get("isPopular") === "true",
      displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
    };

    const service = await prisma.service.update({ where: { id }, data });
    revalidatePath("/dashboard/services");
    revalidatePath("/services");
    return { success: true, service };
  } catch (error) {
    return { success: false, error: "Failed to update service" };
  }
}

// ─── Blog Actions ─────────────────────────────────────────

export async function createBlogPost(formData: FormData) {
  try {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      tags: JSON.stringify((formData.get("tags") as string).split(",").map((t) => t.trim())),
      status: formData.get("status") as string,
      publishedAt: formData.get("publishedAt") ? new Date(formData.get("publishedAt") as string) : null,
    };

    const post = await prisma.blogPost.create({ data });
    revalidatePath("/dashboard/content");
    revalidatePath("/blog");
    return { success: true, post };
  } catch (error) {
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(id: string, formData: FormData) {
  try {
    const data = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      tags: JSON.stringify((formData.get("tags") as string).split(",").map((t) => t.trim())),
      status: formData.get("status") as string,
      publishedAt: formData.get("publishedAt") ? new Date(formData.get("publishedAt") as string) : null,
    };

    const post = await prisma.blogPost.update({ where: { id }, data });
    revalidatePath("/dashboard/content");
    revalidatePath("/blog");
    return { success: true, post };
  } catch (error) {
    return { success: false, error: "Failed to update blog post" };
  }
}

// ─── FAQ Actions ──────────────────────────────────────────

export async function createFAQ(formData: FormData) {
  try {
    const data = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      category: formData.get("category") as string,
      order: parseInt(formData.get("order") as string) || 0,
    };

    const faq = await prisma.fAQ.create({ data });
    revalidatePath("/dashboard/content");
    revalidatePath("/faq");
    return { success: true, faq };
  } catch (error) {
    return { success: false, error: "Failed to create FAQ" };
  }
}

export async function updateFAQ(id: string, formData: FormData) {
  try {
    const data = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      category: formData.get("category") as string,
      order: parseInt(formData.get("order") as string) || 0,
      isActive: formData.get("isActive") === "true",
    };

    const faq = await prisma.fAQ.update({ where: { id }, data });
    revalidatePath("/dashboard/content");
    revalidatePath("/faq");
    return { success: true, faq };
  } catch (error) {
    return { success: false, error: "Failed to update FAQ" };
  }
}
