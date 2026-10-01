/*
  DEFAULT PROJECT CARDS
  ---------------------
  These are the cards that show up the first time the site loads.
  - cat: "ai" (AI Automation) | "web" (Web Developer) | "va" (VA Journey)
  - media (optional): put your file inside the assets folder, then point to it here.
      media: { type: "video", src: "assets/videos/assets/videos/AI-Powered Email Triage & Drafting.mp4" }media: { type: "video", src: "assets/videos/assets/videos/AI-Powered Email Triage & Drafting.mp4" }
      media: { type: "video", src: "assets/videos/assets/videos/Appointment Booking Automation Final.mp4" }
      media: { type: "video", src: "assets/videos/assets/videos/Elysium Frontiermp4" }
      media: { type: "video", src: "assets/videos/assets/videos/Facebook Page Chat Support Automation (RAG).mp4" }media: { type: "image", src: "assets/screenshot.png" }
      media: { type: "json",  src: "assets/workflows/my-workflow.json", name: "my-workflow.json", nodes: 12 }
  - Anything you add with the "+ Add from my files" button is saved only in YOUR browser.
    To make a project visible to everyone who visits your live site, add it here instead.
  - Change DATA_VERSION only if you want new default cards added to your own browser.
*/
window.DATA_VERSION = 1;

window.DEFAULT_CARDS = [
  {
    id: "ai-fb-chat",
    cat: "ai",
    order: 1,
    title: "Facebook Page Chat Support Automation (RAG)",
    desc:
      "The problem: a business page gets the same questions all day and replies slow down after hours.\n\n" +
      "What I built: an n8n workflow that captures each Facebook message, looks up the answer in the business's own knowledge base (Google Docs) using Retrieval-Augmented Generation, and replies through OpenAI.\n\n" +
      "Human in control: when the AI is not confident, the chat is routed to a human agent instead of guessing.\n\n" +
      "Result: faster, consistent replies, including outside business hours, with fewer repetitive support tasks.",
    tags: ["n8n", "Facebook", "OpenAI", "RAG", "Google Docs", "Webhooks", "HTTP Requests"],
    media: { type: "video", src: "assets/videos/Facebook Page Chat Support Automation (RAG).mp4" }
  },
  {
    id: "ai-booking",
    cat: "ai",
    order: 2,
    title: "Appointment Booking Automation",
    desc:
      "The problem: booking requests came in by form and someone had to check the calendar by hand, which led to double bookings.\n\n" +
      "What I built: an n8n workflow that reads each Google Forms request, checks Google Calendar availability in real time, then confirms or rejects the slot automatically.\n\n" +
      "Records: Gmail notifications go out to the customer, and every request and its status is logged in Google Sheets.\n\n" +
      "Result: no double bookings and no repetitive scheduling work.",
    tags: ["n8n", "OpenAI", "Gmail", "Google Forms", "Google Calendar", "Google Sheets", "JavaScript"],
    media: { type: "video", src: "assets/videos/Appointment Booking Automation Final.mp4" }
  },
  {
    id: "ai-email-triage",
    cat: "ai",
    order: 3,
    title: "AI-Powered Email Triage & Drafting",
    desc:
      "The problem: an executive inbox where urgent messages get buried.\n\n" +
      "What I built: an n8n and OpenAI workflow that reads every incoming Gmail message and labels it URGENT, CEO ACTION, FOLLOW UP or FYI. An AI agent then writes a draft reply in the executive's own communication style.\n\n" +
      "Human in control: drafts are saved in Gmail for review, never sent automatically.\n\n" +
      "Result: a sorted inbox and faster replies, with every send still approved by a person.",
    tags: ["n8n", "OpenAI", "Gmail", "AI Agent", "JavaScript"],
    media: { type: "video", src: "assets/videos/AI-Powered Email Triage & Drafting.mp4" }
  },
  {
    id: "web-elysium",
    cat: "web",
    order: 4,
    title: "Elysium Frontier: A Web3 MMORPG (2025)",
    desc:
      "A web-deployed MMORPG with player progression, quests, inventory, combat and an in-game economy.\n\n" +
      "I built the gameplay systems in Unity and C#, used JavaScript for the web-side interactions, and stored player and game data with Supabase and NoSQL. I also explored how blockchain concepts could handle digital assets and game tokens.",
    tags: ["JavaScript", "Unity", "C#", "Supabase", "NoSQL", "Git", "Blockchain"],
    media: { type: "video", src: "assets/videos/Elysium.mp4" }
  },
  {
    id: "web-hospital",
    cat: "web",
    order: 5,
    title: "Hospital Patient Queuing and Management System (2024)",
    desc:
      "A web app for managing patient records, appointments, user access and the waiting queue.\n\n" +
      "I designed the MySQL database, wrote the PHP backend for storing and retrieving patient and appointment data, and built a responsive interface so staff can manage patients and watch the queue.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "XAMPP"],
    media: null
  },
  {
    id: "va-email-calendar",
    cat: "va",
    order: 6,
    title: "Email & Calendar Management",
    desc:
      "Day-to-day executive assistant work: sorting inboxes by priority, spotting follow-ups, and keeping a clear record of communication.\n\n" +
      "I coordinated meetings by checking availability, scheduling events, sending invitations and updating calendar details, and tracked upcoming deadlines so nothing was missed.\n\n" +
      "Result: fewer scheduling conflicts and every request and commitment accounted for.",
    tags: ["Gmail", "Google Calendar", "Email Management", "Scheduling", "Admin Support"],
    media: null
  }
];
