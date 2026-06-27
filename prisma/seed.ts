import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.activityLog.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.mentor.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.university.deleteMany({});
  await prisma.user.deleteMany({});

  // ─── Users ──────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  const counsellorPassword = await bcrypt.hash("counsellor123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@docverse.in",
      name: "Super Admin",
      password: adminPassword,
      role: "SUPER_ADMIN",
      phone: "+91-9876543210",
    },
  });

  const counsellor1 = await prisma.user.create({
    data: {
      email: "counsellor@docverse.in",
      name: "Priya Sharma",
      password: counsellorPassword,
      role: "COUNSELLOR",
      phone: "+91-9876543211",
    },
  });

  const counsellor2 = await prisma.user.create({
    data: {
      email: "mentor@docverse.in",
      name: "Dr. Rajesh Kumar",
      password: counsellorPassword,
      role: "MENTOR",
      phone: "+91-9876543212",
    },
  });

  // ─── Universities ─────────────────────────────────────
  const universities = await prisma.university.createMany({
    data: [
      {
        name: "University of Kerala",
        slug: "university-of-kerala",
        shortName: "Kerala University",
        description: "One of the first 16 universities in India, established in 1937.",
        about: "The University of Kerala is an affiliating university located in Thiruvananthapuram, Kerala. It offers a wide range of PhD programs across multiple disciplines.",
        location: "Thiruvananthapuram",
        state: "Kerala",
        website: "https://www.keralauniversity.ac.in",
        ugcApproved: true,
        naacGrade: "A++",
        nirfRank: 25,
        isPartner: true,
        tieUpStatus: "ACTIVE",
      },
      {
        name: "Mahatma Gandhi University",
        slug: "mahatma-gandhi-university",
        shortName: "MG University",
        description: "Established in 1983, MG University is a premier institution in Kottayam.",
        about: "Mahatma Gandhi University offers excellent research facilities and has a strong focus on interdisciplinary PhD programs.",
        location: "Kottayam",
        state: "Kerala",
        website: "https://www.mgu.ac.in",
        ugcApproved: true,
        naacGrade: "A",
        nirfRank: 42,
        isPartner: true,
        tieUpStatus: "ACTIVE",
      },
      {
        name: "Calicut University",
        slug: "calicut-university",
        shortName: "CU",
        description: "The largest university in Kerala with over 400 affiliated colleges.",
        about: "Calicut University provides extensive research opportunities with state-of-the-art facilities and experienced faculty.",
        location: "Malappuram",
        state: "Kerala",
        website: "https://www.uoc.ac.in",
        ugcApproved: true,
        naacGrade: "A",
        nirfRank: 55,
        isPartner: true,
        tieUpStatus: "ACTIVE",
      },
      {
        name: "Anna University",
        slug: "anna-university",
        shortName: "AU",
        description: "Premier technical university in Tamil Nadu.",
        about: "Anna University is known for its engineering and technology PhD programs with strong industry connections.",
        location: "Chennai",
        state: "Tamil Nadu",
        website: "https://www.annauniv.edu",
        ugcApproved: true,
        naacGrade: "A++",
        nirfRank: 14,
        isPartner: true,
        tieUpStatus: "CONFIRMED",
      },
      {
        name: "Jawaharlal Nehru University",
        slug: "jnu",
        shortName: "JNU",
        description: "India's premier research university in New Delhi.",
        about: "JNU is renowned for its social sciences and humanities research programs with a vibrant academic community.",
        location: "New Delhi",
        state: "Delhi",
        website: "https://www.jnu.ac.in",
        ugcApproved: true,
        naacGrade: "A++",
        nirfRank: 2,
        isPartner: false,
        tieUpStatus: "IN_TALKS",
      },
    ],
  });

  const uniList = await prisma.university.findMany();

  // ─── Programs ─────────────────────────────────────────
  const programs = await prisma.program.createMany({
    data: [
      // Kerala University
      {
        name: "PhD in Management",
        slug: "phd-management-kerala-university",
        discipline: "Management",
        description: "Doctor of Philosophy in Management with specializations in Finance, Marketing, HR, and Operations.",
        duration: "3-5 years",
        mode: "PART_TIME",
        feeMin: 75000,
        feeMax: 150000,
        eligibility: "Master's degree in Management or related field with minimum 55% marks",
        entranceExam: "University Entrance Test + Interview",
        universityId: uniList[0].id,
        isFeatured: true,
      },
      {
        name: "PhD in Computer Science",
        slug: "phd-computer-science-kerala-university",
        discipline: "Computer Science",
        description: "Research-focused PhD program in Computer Science covering AI, ML, Data Science, and Cybersecurity.",
        duration: "3-5 years",
        mode: "FULL_TIME",
        feeMin: 60000,
        feeMax: 120000,
        eligibility: "M.Tech / M.Sc in Computer Science with minimum 55% marks",
        entranceExam: "UGC NET / GATE / University Entrance",
        universityId: uniList[0].id,
        isFeatured: true,
      },
      {
        name: "PhD in English Literature",
        slug: "phd-english-kerala-university",
        discipline: "English Literature",
        description: "PhD in English Literature with focus on postcolonial studies, gender studies, and digital humanities.",
        duration: "3-5 years",
        mode: "PART_TIME",
        feeMin: 50000,
        feeMax: 100000,
        eligibility: "M.A. in English with minimum 55% marks",
        entranceExam: "University Entrance Test",
        universityId: uniList[0].id,
      },
      // MG University
      {
        name: "PhD in Commerce",
        slug: "phd-commerce-mgu",
        discipline: "Commerce",
        description: "PhD in Commerce with specializations in Accounting, Finance, and International Business.",
        duration: "3-5 years",
        mode: "PART_TIME",
        feeMin: 70000,
        feeMax: 140000,
        eligibility: "M.Com with minimum 55% marks",
        entranceExam: "University Entrance Test",
        universityId: uniList[1].id,
        isFeatured: true,
      },
      {
        name: "PhD in Psychology",
        slug: "phd-psychology-mgu",
        discipline: "Psychology",
        description: "PhD in Clinical Psychology, Organizational Psychology, and Cognitive Science.",
        duration: "3-5 years",
        mode: "FULL_TIME",
        feeMin: 80000,
        feeMax: 160000,
        eligibility: "M.Sc / M.A. in Psychology with minimum 55% marks",
        entranceExam: "UGC NET / University Entrance",
        universityId: uniList[1].id,
      },
      // Calicut University
      {
        name: "PhD in Education",
        slug: "phd-education-calicut",
        discipline: "Education",
        description: "PhD in Education with focus on curriculum development, educational technology, and policy studies.",
        duration: "3-5 years",
        mode: "DISTANCE",
        feeMin: 45000,
        feeMax: 90000,
        eligibility: "M.Ed with minimum 55% marks",
        entranceExam: "University Entrance Test",
        universityId: uniList[2].id,
      },
      {
        name: "PhD in Biotechnology",
        slug: "phd-biotechnology-calicut",
        discipline: "Biotechnology",
        description: "PhD in Biotechnology covering molecular biology, genetic engineering, and bioinformatics.",
        duration: "3-5 years",
        mode: "FULL_TIME",
        feeMin: 100000,
        feeMax: 200000,
        eligibility: "M.Sc in Biotechnology / Life Sciences with minimum 55% marks",
        entranceExam: "CSIR NET / GATE / University Entrance",
        universityId: uniList[2].id,
        isFeatured: true,
      },
      // Anna University
      {
        name: "PhD in Engineering",
        slug: "phd-engineering-anna",
        discipline: "Engineering",
        description: "PhD in various engineering disciplines including Civil, Mechanical, Electrical, and Electronics.",
        duration: "3-5 years",
        mode: "FULL_TIME",
        feeMin: 120000,
        feeMax: 250000,
        eligibility: "M.E / M.Tech with minimum 55% marks",
        entranceExam: "GATE / University Entrance",
        universityId: uniList[3].id,
        isFeatured: true,
      },
      {
        name: "PhD in Information Technology",
        slug: "phd-it-anna",
        discipline: "Information Technology",
        description: "PhD in IT with specializations in Cloud Computing, IoT, and Blockchain.",
        duration: "3-5 years",
        mode: "PART_TIME",
        feeMin: 100000,
        feeMax: 200000,
        eligibility: "M.Tech / M.Sc in IT with minimum 55% marks",
        entranceExam: "GATE / University Entrance",
        universityId: uniList[3].id,
      },
    ],
  });

  // ─── Services ─────────────────────────────────────────
  const services = await prisma.service.createMany({
    data: [
      {
        name: "PhD Admission Package – Basic",
        slug: "phd-admission-basic",
        category: "ADMISSION",
        description: "Complete admission assistance including university selection, eligibility check, and documentation support.",
        shortDesc: "University selection, eligibility check, documentation support",
        features: JSON.stringify([
          "University shortlisting (up to 5 universities)",
          "Eligibility assessment",
          "Document verification & compilation",
          "Application form filling assistance",
          "Email & chat support",
        ]),
        priceMin: 15000,
        priceMax: 25000,
        isActive: true,
        displayOrder: 1,
      },
      {
        name: "PhD Admission Package – Pro",
        slug: "phd-admission-pro",
        category: "ADMISSION",
        description: "Advanced admission package with entrance coaching, synopsis preparation, and guide matching.",
        shortDesc: "Everything in Basic + entrance coaching, synopsis prep, guide matching",
        features: JSON.stringify([
          "Everything in Basic Package",
          "Entrance exam coaching (UGC NET/GATE/University)",
          "Synopsis preparation assistance",
          "Guide/supervisor matching",
          "Interview preparation",
          "Priority support via WhatsApp",
        ]),
        priceMin: 35000,
        priceMax: 50000,
        isActive: true,
        isPopular: true,
        displayOrder: 2,
      },
      {
        name: "PhD Complete Package",
        slug: "phd-complete-package",
        category: "COMPLETE_PACKAGE",
        description: "End-to-end PhD support from admission to thesis submission. Your dedicated research partner.",
        shortDesc: "End-to-end from admission to thesis submission",
        features: JSON.stringify([
          "Everything in Pro Package",
          "Topic selection & research design",
          "Literature review assistance",
          "Chapter-wise thesis writing support",
          "Plagiarism check & correction",
          "Journal publication guidance",
          "Viva preparation",
          "Dedicated mentor (4 sessions/month)",
        ]),
        priceMin: 75000,
        priceMax: 120000,
        isActive: true,
        isPopular: true,
        displayOrder: 3,
      },
      {
        name: "Thesis Writing Assistance",
        slug: "thesis-writing",
        category: "THESIS",
        description: "Professional thesis writing support with chapter-wise delivery and plagiarism checking.",
        shortDesc: "Chapter-wise thesis writing with plagiarism check",
        features: JSON.stringify([
          "Chapter-wise writing support",
          "Research methodology guidance",
          "Data analysis assistance",
          "Plagiarism check (Turnitin)",
          "Unlimited revisions",
          "Formatting as per university guidelines",
        ]),
        priceMin: 20000,
        priceMax: 60000,
        isActive: true,
        displayOrder: 4,
      },
      {
        name: "Synopsis Preparation",
        slug: "synopsis-preparation",
        category: "SYNOPSIS",
        description: "Expert synopsis preparation as per your university format and guidelines.",
        shortDesc: "20-30 page research synopsis as per university format",
        features: JSON.stringify([
          "Title & problem statement formulation",
          "Literature review summary",
          "Research methodology design",
          "Expected outcomes & timeline",
          "References & bibliography",
          "Unlimited revisions",
        ]),
        priceMin: 8000,
        priceMax: 15000,
        isActive: true,
        displayOrder: 5,
      },
      {
        name: "Journal Publication Help",
        slug: "journal-publication",
        category: "JOURNAL",
        description: "Manuscript preparation and submission assistance for UGC-CARE and Scopus-indexed journals.",
        shortDesc: "Manuscript preparation + submission in UGC/Scopus journals",
        features: JSON.stringify([
          "Journal selection (UGC-CARE / Scopus)",
          "Manuscript writing & formatting",
          "Cover letter preparation",
          "Submission & follow-up",
          "Reviewer response handling",
          "Publication guarantee (Scopus)",
        ]),
        priceMin: 10000,
        priceMax: 30000,
        isActive: true,
        displayOrder: 6,
      },
      {
        name: "Entrance Exam Coaching",
        slug: "entrance-coaching",
        category: "COACHING",
        description: "Live and recorded coaching for UGC NET, GATE, and university-specific entrance exams.",
        shortDesc: "Live/recorded coaching for UGC NET, GATE, university exams",
        features: JSON.stringify([
          "Live classes (2x/week)",
          "Recorded sessions access",
          "Study material & notes",
          "Mock tests & previous papers",
          "Doubt clearing sessions",
          "Performance analytics",
        ]),
        priceMin: 5000,
        priceMax: 12000,
        isActive: true,
        displayOrder: 7,
      },
      {
        name: "1:1 Expert Mentoring",
        slug: "expert-mentoring",
        category: "MENTORING",
        description: "Personalized mentoring sessions with PhD holders in your discipline.",
        shortDesc: "Monthly mentor session – 4 sessions/month",
        features: JSON.stringify([
          "4 one-on-one sessions per month",
          "Discipline-matched PhD mentor",
          "Research guidance & feedback",
          "Career counseling",
          "WhatsApp support between sessions",
          "Progress tracking",
        ]),
        priceMin: 3000,
        priceMax: 3000,
        isCustomPrice: false,
        isActive: true,
        displayOrder: 8,
      },
    ],
  });

  // ─── Mentors ──────────────────────────────────────────
  const mentor = await prisma.mentor.create({
    data: {
      userId: counsellor2.id,
      bio: "Dr. Rajesh Kumar has over 15 years of experience in Computer Science research. He has guided 20+ PhD scholars and published 50+ papers in Scopus-indexed journals.",
      expertise: JSON.stringify(["Computer Science", "AI/ML", "Data Science", "Cybersecurity"]),
      qualifications: JSON.stringify([
        { degree: "PhD in Computer Science", university: "IIT Madras", year: 2010 },
        { degree: "M.Tech in Information Technology", university: "NIT Calicut", year: 2005 },
      ]),
      experience: 15,
      isAvailable: true,
      maxStudents: 8,
      rating: 4.9,
      reviewCount: 42,
      isVerified: true,
      linkedInUrl: "https://linkedin.com/in/dr-rajesh-kumar",
    },
  });

  // ─── Blog Posts ───────────────────────────────────────
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        title: "Complete Guide to PhD Admission in India 2026",
        slug: "complete-guide-phd-admission-india-2026",
        excerpt: "Everything you need to know about PhD admissions in India – eligibility, entrance exams, fees, and top universities.",
        content: `# Complete Guide to PhD Admission in India 2026

Pursuing a PhD in India has become increasingly accessible, especially for working professionals. This comprehensive guide covers everything you need to know.

## Eligibility Criteria

- Master's degree with minimum 55% marks (50% for SC/ST/OBC)
- Valid UGC NET / GATE / University entrance score
- Research proposal (for some universities)

## Top Entrance Exams

1. **UGC NET** – National Eligibility Test
2. **GATE** – For engineering and technology
3. **University-specific entrance tests**

## Application Timeline

Most universities open applications between January and March for the academic year starting in July.

## Fees Structure

PhD fees in India range from ₹30,000 to ₹3,00,000 per year depending on the university and discipline.

## Tips for Working Professionals

- Consider part-time or distance PhD programs
- Look for universities with flexible schedules
- Connect with alumni for guidance
- Prepare your research topic in advance

---

*DocVerse is India's #1 PhD guidance platform for working professionals.*`,
        author: "Dr. Priya Sharma",
        category: "Admission Guide",
        tags: JSON.stringify(["PhD Admission", "India", "2026", "Working Professionals", "UGC NET"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-15"),
        viewCount: 1250,
      },
      {
        title: "Part-Time PhD vs Full-Time PhD: Which is Right for You?",
        slug: "part-time-vs-full-time-phd",
        excerpt: "Compare part-time and full-time PhD programs to find the best fit for your career and lifestyle.",
        content: `# Part-Time PhD vs Full-Time PhD

Choosing between a part-time and full-time PhD is one of the most important decisions for aspiring researchers.

## Full-Time PhD

**Duration:** 3-5 years
**Best for:** Fresh postgraduates, research-focused careers
**Pros:**
- Dedicated research time
- Access to full campus resources
- Stipend and fellowship opportunities
- Faster completion

**Cons:**
- Cannot work full-time
- Financial constraints
- Less flexible schedule

## Part-Time PhD

**Duration:** 4-6 years
**Best for:** Working professionals, career upgraders
**Pros:**
- Continue working while studying
- Apply research to real-world problems
- Financially sustainable
- Flexible schedule

**Cons:**
- Longer duration
- Limited campus access
- Requires strong time management

## Making the Decision

Consider your career goals, financial situation, and personal commitments before choosing.

---

*Need help deciding? Talk to our experts at DocVerse.*`,
        author: "Dr. Rajesh Kumar",
        category: "Career Guide",
        tags: JSON.stringify(["Part-Time PhD", "Full-Time PhD", "Working Professionals", "Career"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-01"),
        viewCount: 890,
      },
      {
        title: "Top 10 UGC-Approved Universities for PhD in Kerala",
        slug: "top-ugc-approved-universities-phd-kerala",
        excerpt: "Discover the best UGC-approved universities in Kerala for your PhD journey with fees, rankings, and program details.",
        content: `# Top 10 UGC-Approved Universities for PhD in Kerala

Kerala is home to some of India's finest universities with strong research ecosystems.

## 1. University of Kerala
- **Location:** Thiruvananthapuram
- **NAAC Grade:** A++
- **NIRF Rank:** 25
- **Popular Programs:** Management, Computer Science, English

## 2. Mahatma Gandhi University
- **Location:** Kottayam
- **NAAC Grade:** A
- **NIRF Rank:** 42
- **Popular Programs:** Commerce, Psychology, Biotechnology

## 3. Calicut University
- **Location:** Malappuram
- **NAAC Grade:** A
- **NIRF Rank:** 55
- **Popular Programs:** Education, Biotechnology, Literature

## 4. Cochin University of Science and Technology (CUSAT)
- **Location:** Kochi
- **NAAC Grade:** A
- **Popular Programs:** Engineering, Marine Science, Physics

## 5. Kannur University
- **Location:** Kannur
- **NAAC Grade:** B++
- **Popular Programs:** Social Sciences, Languages, Science

## 6. Sree Sankaracharya University of Sanskrit
- **Location:** Kalady
- **Specialization:** Sanskrit, Philosophy, Indian Studies

## 7. Kerala Agricultural University
- **Location:** Thrissur
- **Specialization:** Agriculture, Veterinary Science

## 8. APJ Abdul Kalam Technological University
- **Location:** Thiruvananthapuram
- **Specialization:** Technology, Engineering

## 9. Indian Institute of Space Science and Technology (IIST)
- **Location:** Thiruvananthapuram
- **Specialization:** Space Science, Physics

## 10. National Institute of Technology Calicut (NITC)
- **Location:** Kozhikode
- **Specialization:** Engineering, Technology

---

*DocVerse can help you choose the right university. Apply now!*`,
        author: "Priya Sharma",
        category: "University Guide",
        tags: JSON.stringify(["Kerala", "UGC Approved", "Universities", "PhD Programs", "Rankings"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-10"),
        viewCount: 2100,
      },
      {
        title: "How to Write a Winning PhD Research Proposal",
        slug: "how-to-write-winning-phd-research-proposal",
        excerpt: "A step-by-step guide to crafting a compelling research proposal that gets you accepted into top PhD programs.",
        content: `# How to Write a Winning PhD Research Proposal

Your research proposal is the most critical document in your PhD application. Here's how to make it outstanding.

## Structure of a Research Proposal

### 1. Title
- Clear, concise, and descriptive
- Reflects the research question
- Avoid jargon

### 2. Abstract (250-300 words)
- Research problem
- Methodology
- Expected outcomes
- Significance

### 3. Introduction
- Background and context
- Research gap
- Research questions
- Objectives

### 4. Literature Review
- Current state of research
- Identified gaps
- Theoretical framework

### 5. Methodology
- Research design
- Data collection methods
- Analysis techniques
- Ethical considerations

### 6. Timeline
- Phase-wise breakdown
- Milestones
- Expected completion

### 7. References
- Relevant, recent, and credible sources
- Proper citation format

## Common Mistakes to Avoid

1. **Vague research questions** – Be specific
2. **Unrealistic scope** – Keep it manageable
3. **Poor literature review** – Show depth of understanding
4. **Weak methodology** – Justify your approach
5. **Ignoring feasibility** – Consider resources and time

## Tips for Success

- Start with a strong hook
- Show originality and contribution
- Demonstrate feasibility
- Proofread meticulously
- Get feedback from mentors

---

*Need help with your research proposal? DocVerse offers expert synopsis preparation services.*`,
        author: "Dr. Rajesh Kumar",
        category: "Research Guide",
        tags: JSON.stringify(["Research Proposal", "PhD Application", "Writing Tips", "Synopsis"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-03-01"),
        viewCount: 1560,
      },
      {
        title: "UGC NET 2026: Complete Preparation Strategy",
        slug: "ugc-net-2026-preparation-strategy",
        excerpt: "Master the UGC NET exam with our comprehensive preparation strategy, study plan, and expert tips.",
        content: `# UGC NET 2026: Complete Preparation Strategy

The UGC NET (National Eligibility Test) is the gateway to PhD admissions and Assistant Professor positions in India.

## Exam Pattern

**Paper 1:** Teaching & Research Aptitude (50 questions, 100 marks)
**Paper 2:** Subject-specific (100 questions, 200 marks)

## Preparation Timeline

### Month 1-2: Foundation
- Understand the syllabus thoroughly
- Collect standard reference books
- Create a study schedule

### Month 3-4: Deep Dive
- Complete subject-wise study
- Make concise notes
- Solve previous year papers

### Month 5-6: Revision & Mock Tests
- Intensive revision
- Daily mock tests
- Time management practice

## Subject-wise Strategy

### Paper 1 Topics:
- Teaching Aptitude
- Research Aptitude
- Comprehension
- Communication
- Mathematical Reasoning
- Logical Reasoning
- Data Interpretation
- ICT
- People & Environment
- Higher Education System

## Recommended Books

1. **UGC NET Paper 1** by Trueman's
2. **Subject-specific books** by reputed authors
3. **Previous Year Papers** (last 10 years)

## Online Resources

- NTA official website
- UGC NET preparation apps
- YouTube channels by subject experts

## Final Tips

- Practice daily
- Focus on weak areas
- Stay updated with current affairs
- Maintain a healthy routine

---

*DocVerse offers UGC NET coaching with live classes and mock tests. Enroll now!*`,
        author: "Priya Sharma",
        category: "Exam Preparation",
        tags: JSON.stringify(["UGC NET", "Exam Preparation", "2026", "Teaching", "Research"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-03-15"),
        viewCount: 3200,
      },
    ],
  });

  // ─── Testimonials ─────────────────────────────────────
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: "Dr. Anil Menon",
        designation: "Senior Manager",
        organization: "Infosys",
        city: "Kochi",
        content: "DocVerse made my PhD dream a reality while I continued working. Their part-time program guidance and thesis support were exceptional. I completed my PhD in Management from Kerala University in 4 years.",
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Dr. Sreeja Nair",
        designation: "Assistant Professor",
        organization: "Sacred Heart College",
        city: "Kochi",
        content: "As a college lecturer, I needed a flexible PhD program. DocVerse connected me with the right university and provided excellent mentoring throughout my journey.",
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Mohammed Rafi",
        designation: "Project Manager",
        organization: "Dubai Construction Co.",
        city: "Dubai",
        content: "Living in Dubai, I wanted to pursue an Indian PhD for career growth. DocVerse handled everything remotely – from university selection to thesis submission. Truly a lifesaver!",
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Dr. Lakshmi Priya",
        designation: "Research Scientist",
        organization: "CSIR",
        city: "Thiruvananthapuram",
        content: "The journal publication assistance from DocVerse helped me publish 3 papers in Scopus-indexed journals. Their expertise in manuscript preparation is unmatched.",
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Vijay Kumar",
        designation: "Software Engineer",
        organization: "TCS",
        city: "Bangalore",
        content: "I was skeptical about online PhD guidance, but DocVerse exceeded my expectations. Their mentor matching system paired me with a perfect guide in Computer Science.",
        rating: 4,
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Dr. Meera Krishnan",
        designation: "Principal",
        organization: "St. Mary's School",
        city: "Kottayam",
        content: "The complete package was worth every rupee. From admission to viva, DocVerse was with me at every step. Highly recommended for working professionals.",
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
    ],
  });

  // ─── FAQs ───────────────────────────────────────────────
  const faqs = await prisma.fAQ.createMany({
    data: [
      {
        question: "What is the eligibility criteria for PhD admission in India?",
        answer: "You need a Master's degree with minimum 55% marks (50% for SC/ST/OBC candidates). Some universities also require a valid UGC NET/GATE score or passing their entrance examination.",
        category: "Admission",
        order: 1,
      },
      {
        question: "Can I do a PhD while working full-time?",
        answer: "Yes! Many universities in India offer part-time and distance PhD programs specifically designed for working professionals. DocVerse specializes in helping you find the right flexible program.",
        category: "Admission",
        order: 2,
      },
      {
        question: "How long does a part-time PhD take?",
        answer: "A part-time PhD typically takes 4-6 years to complete, compared to 3-5 years for a full-time program. The exact duration depends on the university and your research progress.",
        category: "Programs",
        order: 3,
      },
      {
        question: "What is the fee structure for PhD programs in India?",
        answer: "PhD fees vary widely from ₹30,000 to ₹3,00,000 per year depending on the university (government vs. private), discipline, and mode of study. DocVerse provides transparent pricing for all partner universities.",
        category: "Fees",
        order: 4,
      },
      {
        question: "Do I need UGC NET for PhD admission?",
        answer: "UGC NET is required for JRF (Junior Research Fellowship) and is preferred by many universities. However, some universities conduct their own entrance exams. GATE is accepted for engineering and technology programs.",
        category: "Admission",
        order: 5,
      },
      {
        question: "What services does DocVerse offer?",
        answer: "DocVerse offers comprehensive PhD guidance including admission assistance, thesis writing, synopsis preparation, journal publication help, entrance exam coaching, and 1:1 expert mentoring.",
        category: "Services",
        order: 6,
      },
      {
        question: "How does the mentor matching work?",
        answer: "We match you with PhD holders in your specific discipline who have experience guiding research scholars. Our mentors are verified professionals with publications and academic credentials.",
        category: "Mentoring",
        order: 7,
      },
      {
        question: "Is my research data confidential?",
        answer: "Absolutely. We have strict confidentiality agreements in place. Your research data, thesis content, and personal information are protected and never shared with third parties.",
        category: "Privacy",
        order: 8,
      },
      {
        question: "Can NRI professionals pursue PhD from Indian universities?",
        answer: "Yes, many Indian universities welcome NRI and international students. DocVerse specializes in helping Gulf-based and NRI professionals navigate the admission process remotely.",
        category: "Admission",
        order: 9,
      },
      {
        question: "What is the refund policy?",
        answer: "We offer a 7-day money-back guarantee on all service packages if you're not satisfied. For ongoing services, refunds are processed on a pro-rata basis. Contact our support team for details.",
        category: "Payments",
        order: 10,
      },
      {
        question: "How do I track my PhD progress?",
        answer: "DocVerse provides a dedicated student portal where you can track your application status, mentor sessions, document submissions, and overall progress in real-time.",
        category: "Portal",
        order: 11,
      },
      {
        question: "Do you help with journal publications?",
        answer: "Yes, our Journal Publication Help service includes manuscript preparation, journal selection (UGC-CARE/Scopus), submission, and reviewer response handling. We have a high acceptance rate.",
        category: "Services",
        order: 12,
      },
    ],
  });

  // ─── Sample Leads ─────────────────────────────────────
  const leads = await prisma.lead.createMany({
    data: [
      {
        name: "Rahul Krishnan",
        email: "rahul.k@email.com",
        phone: "+91-9876543201",
        qualification: "MBA",
        discipline: "Management",
        state: "Kerala",
        modePreference: "Part-time",
        budgetRange: "50,000 - 1,00,000",
        isUrgent: false,
        source: "ORGANIC",
        status: "QUALIFIED",
        priority: "HIGH",
        assignedToId: counsellor1.id,
      },
      {
        name: "Fatima Hassan",
        email: "fatima.h@email.com",
        phone: "+91-9876543202",
        qualification: "M.Sc Computer Science",
        discipline: "Computer Science",
        state: "Kerala",
        modePreference: "Full-time",
        budgetRange: "1,00,000 - 2,00,000",
        isUrgent: true,
        source: "META_ADS",
        status: "NEW",
        priority: "URGENT",
      },
      {
        name: "Arun Nair",
        email: "arun.n@email.com",
        phone: "+91-9876543203",
        qualification: "M.Com",
        discipline: "Commerce",
        state: "Kerala",
        modePreference: "Distance",
        budgetRange: "30,000 - 50,000",
        isUrgent: false,
        source: "GOOGLE_ADS",
        status: "CONTACTED",
        priority: "MEDIUM",
        assignedToId: counsellor1.id,
      },
      {
        name: "Shalini Menon",
        email: "shalini.m@email.com",
        phone: "+91-9876543204",
        qualification: "M.A. English",
        discipline: "English Literature",
        state: "Kerala",
        modePreference: "Part-time",
        budgetRange: "50,000 - 1,00,000",
        isUrgent: false,
        source: "REFERRAL",
        status: "FOLLOW_UP",
        priority: "MEDIUM",
        assignedToId: counsellor1.id,
      },
      {
        name: "Khalid Mohammed",
        email: "khalid.m@email.com",
        phone: "+91-9876543205",
        qualification: "B.Tech + MBA",
        discipline: "Engineering",
        state: "Kerala",
        modePreference: "Online",
        budgetRange: "1,00,000+",
        isUrgent: true,
        source: "WHATSAPP",
        status: "NEW",
        priority: "HIGH",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log("📊 Created:");
  console.log("   • 3 Users (Admin, Counsellor, Mentor)");
  console.log("   • 5 Universities");
  console.log("   • 9 PhD Programs");
  console.log("   • 8 Services");
  console.log("   • 1 Mentor");
  console.log("   • 5 Blog Posts");
  console.log("   • 6 Testimonials");
  console.log("   • 12 FAQs");
  console.log("   • 5 Sample Leads");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
