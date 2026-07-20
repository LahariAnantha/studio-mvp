// Mock users
export const USERS = {
  admin: {
    id: "user-admin",
    email: "admin@example.com",
    name: "Alex Rivera",
    avatar: "AR",
    role: "Admin",
    avatarColor: "#b39ddb",
  },
  member: {
    id: "user-member",
    email: "member@example.com",
    name: "Morgan Lee",
    avatar: "ML",
    role: "Member",
    avatarColor: "#80cbc4",
  },
  sketch: {
    id: "user-sketch",
    email: "sketch@studio.ai",
    name: "Sketch",
    avatar: "SK",
    role: "AI Assistant",
    avatarColor: "#f8bbd0",
    isAI: true,
  },
};

// Soccer workspace data
export const SOCCER_WORKSPACE = {
  id: "ws-soccer",
  name: "⚽ Soccer Club",
  type: "soccer",
  description: "AI-built workspace for our soccer team",
  rooms: [
    {
      id: "room-soccer-general",
      name: "General Chat",
      icon: "💬",
      type: "discussion",
      messages: [
        {
          id: "msg-s1",
          userId: "user-admin",
          text: "Welcome to the Soccer Club workspace! 🎉 Let's get the season started.",
          timestamp: "2026-07-19T09:00:00Z",
          reactions: [{ emoji: "⚽", count: 3 }, { emoji: "👍", count: 2 }],
        },
        {
          id: "msg-s2",
          userId: "user-member",
          text: "So pumped for this season! When is our first practice?",
          timestamp: "2026-07-19T09:05:00Z",
          reactions: [{ emoji: "🔥", count: 2 }],
        },
        {
          id: "msg-s3",
          userId: "user-sketch",
          text: "Hey team! I'm Sketch, your AI assistant. I've set up this workspace based on your team profile. I noticed you play 3x per week — I'll track your availability and send reminders before each session! 🤖⚽",
          timestamp: "2026-07-19T09:10:00Z",
          reactions: [{ emoji: "❤️", count: 4 }],
        },
      ],
      files: [
        {
          id: "file-s1",
          name: "Season Schedule 2026.pdf",
          type: "pdf",
          size: "1.2 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-18T08:00:00Z",
        },
        {
          id: "file-s2",
          name: "Team Roster.xlsx",
          type: "spreadsheet",
          size: "340 KB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-18T08:15:00Z",
        },
      ],
      tabs: [
        { id: "tab-s-overview", label: "Overview", icon: "🏠" },
        { id: "tab-s-messages", label: "Messages", icon: "💬" },
        { id: "tab-s-files", label: "Files", icon: "📁" },
        { id: "tab-s-tasks", label: "Tasks", icon: "✅" },
      ],
    },
    {
      id: "room-soccer-tactics",
      name: "Tactics Board",
      icon: "🗺️",
      type: "planning",
      messages: [
        {
          id: "msg-st1",
          userId: "user-admin",
          text: "I've uploaded our formation diagram for the upcoming match. Everyone please review the 4-3-3 setup.",
          timestamp: "2026-07-19T10:00:00Z",
          reactions: [{ emoji: "👀", count: 3 }],
        },
        {
          id: "msg-st2",
          userId: "user-member",
          text: "Love the new pressing strategy! Should we practice the high press this Thursday?",
          timestamp: "2026-07-19T10:15:00Z",
          reactions: [{ emoji: "💪", count: 2 }],
        },
        {
          id: "msg-st3",
          userId: "user-sketch",
          text: "Based on your last 5 games, your team concedes most goals in the 70-90 minute range. Consider rotating more often in the second half. Want me to create a substitution plan?",
          timestamp: "2026-07-19T10:20:00Z",
          reactions: [{ emoji: "🧠", count: 5 }],
        },
      ],
      files: [
        {
          id: "file-st1",
          name: "4-3-3 Formation.png",
          type: "image",
          size: "850 KB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-19T09:50:00Z",
        },
        {
          id: "file-st2",
          name: "Corner Kick Plays.pdf",
          type: "pdf",
          size: "2.1 MB",
          uploadedBy: "user-member",
          uploadedAt: "2026-07-19T10:05:00Z",
        },
      ],
      tabs: [
        { id: "tab-st-overview", label: "Overview", icon: "🏠" },
        { id: "tab-st-messages", label: "Messages", icon: "💬" },
        { id: "tab-st-files", label: "Files", icon: "📁" },
        { id: "tab-st-whiteboard", label: "Whiteboard", icon: "🗺️" },
      ],
    },
    {
      id: "room-soccer-training",
      name: "Training Hub",
      icon: "🏋️",
      type: "execution",
      messages: [
        {
          id: "msg-str1",
          userId: "user-member",
          text: "Thursday training: 6 PM at Riverside Park. Bring your bibs!",
          timestamp: "2026-07-20T08:00:00Z",
          reactions: [{ emoji: "✅", count: 7 }],
        },
        {
          id: "msg-str2",
          userId: "user-admin",
          text: "We'll focus on set pieces and defensive shape this session. See everyone there! 💪",
          timestamp: "2026-07-20T08:30:00Z",
          reactions: [{ emoji: "🔥", count: 4 }],
        },
        {
          id: "msg-str3",
          userId: "user-sketch",
          text: "Reminder: Thursday session starts in 2 hours! Weather looks great — 72°F, light breeze. I've also prepared individual warmup routines based on each player's fitness logs. Check your direct messages!",
          timestamp: "2026-07-20T16:00:00Z",
          reactions: [{ emoji: "👏", count: 6 }],
        },
      ],
      files: [
        {
          id: "file-str1",
          name: "Warmup Drills.mp4",
          type: "video",
          size: "45 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-19T14:00:00Z",
        },
        {
          id: "file-str2",
          name: "Training Plan July.pdf",
          type: "pdf",
          size: "780 KB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-19T14:10:00Z",
        },
      ],
      tabs: [
        { id: "tab-str-overview", label: "Overview", icon: "🏠" },
        { id: "tab-str-messages", label: "Messages", icon: "💬" },
        { id: "tab-str-files", label: "Files", icon: "📁" },
        { id: "tab-str-schedule", label: "Schedule", icon: "📅" },
      ],
    },
    {
      id: "room-soccer-results",
      name: "Match Results",
      icon: "🏆",
      type: "archive",
      messages: [
        {
          id: "msg-sr1",
          userId: "user-admin",
          text: "FINAL SCORE — FC Studio 3 : 1 City Rovers 🎉🎉🎉 Great performance today, everyone!",
          timestamp: "2026-07-15T18:00:00Z",
          reactions: [{ emoji: "🏆", count: 10 }, { emoji: "🎉", count: 8 }],
        },
        {
          id: "msg-sr2",
          userId: "user-member",
          text: "Hat trick by Jamie!! 🔥 What a finish on that second goal.",
          timestamp: "2026-07-15T18:10:00Z",
          reactions: [{ emoji: "⚽", count: 6 }],
        },
        {
          id: "msg-sr3",
          userId: "user-sketch",
          text: "Match analysis complete! Possession: 62% vs 38%. Shots on target: 8 vs 3. Top performer: Jamie (3 goals, 2 key passes). Full report has been added to Files. Well done team! 📊",
          timestamp: "2026-07-15T18:30:00Z",
          reactions: [{ emoji: "📊", count: 5 }],
        },
      ],
      files: [
        {
          id: "file-sr1",
          name: "Match Report vs City Rovers.pdf",
          type: "pdf",
          size: "1.5 MB",
          uploadedBy: "user-sketch",
          uploadedAt: "2026-07-15T18:30:00Z",
        },
        {
          id: "file-sr2",
          name: "Highlight Reel.mp4",
          type: "video",
          size: "120 MB",
          uploadedBy: "user-member",
          uploadedAt: "2026-07-16T09:00:00Z",
        },
      ],
      tabs: [
        { id: "tab-sr-overview", label: "Overview", icon: "🏠" },
        { id: "tab-sr-messages", label: "Messages", icon: "💬" },
        { id: "tab-sr-files", label: "Files", icon: "📁" },
        { id: "tab-sr-stats", label: "Stats", icon: "📊" },
      ],
    },
  ],
};

// Fashion workspace data
export const FASHION_WORKSPACE = {
  id: "ws-fashion",
  name: "✨ Fashion Studio",
  type: "fashion",
  description: "AI-built workspace for our fashion collective",
  rooms: [
    {
      id: "room-fashion-general",
      name: "Style Chat",
      icon: "💬",
      type: "discussion",
      messages: [
        {
          id: "msg-f1",
          userId: "user-admin",
          text: "Welcome to Fashion Studio! 👗✨ This is our creative hub — let's build something beautiful together.",
          timestamp: "2026-07-19T09:00:00Z",
          reactions: [{ emoji: "✨", count: 5 }, { emoji: "👗", count: 3 }],
        },
        {
          id: "msg-f2",
          userId: "user-member",
          text: "Obsessed with the pastel aesthetic this workspace has! So on brand 🎀",
          timestamp: "2026-07-19T09:10:00Z",
          reactions: [{ emoji: "💕", count: 4 }],
        },
        {
          id: "msg-f3",
          userId: "user-sketch",
          text: "Hello, Fashion Studio! I'm Sketch, your AI creative assistant. I've set up this workspace based on your team's focus on editorial fashion and brand storytelling. I'll help with trend research, mood board curation, and campaign planning! 🤖🎨",
          timestamp: "2026-07-19T09:15:00Z",
          reactions: [{ emoji: "❤️", count: 6 }],
        },
      ],
      files: [
        {
          id: "file-f1",
          name: "Brand Guidelines 2026.pdf",
          type: "pdf",
          size: "4.2 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-18T10:00:00Z",
        },
        {
          id: "file-f2",
          name: "Color Palette SS26.png",
          type: "image",
          size: "1.8 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-18T10:10:00Z",
        },
      ],
      tabs: [
        { id: "tab-f-overview", label: "Overview", icon: "🏠" },
        { id: "tab-f-messages", label: "Messages", icon: "💬" },
        { id: "tab-f-files", label: "Files", icon: "📁" },
        { id: "tab-f-moodboard", label: "Mood Board", icon: "🎨" },
      ],
    },
    {
      id: "room-fashion-inspo",
      name: "Fashion Inspo",
      icon: "🖼️",
      type: "creative",
      isInspoRoom: true,
      inspoImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      inspoImageAlt: "Fashion inspiration - elegant editorial styling",
      messages: [
        {
          id: "msg-fi1",
          userId: "user-member",
          text: "Dropped some summer editorial refs in the inspo board — loving the soft neutrals mixed with bold accessories trend 🌿✨",
          timestamp: "2026-07-19T11:00:00Z",
          reactions: [{ emoji: "😍", count: 6 }, { emoji: "🔥", count: 3 }],
        },
        {
          id: "msg-fi2",
          userId: "user-admin",
          text: "The tonal dressing vibe in these shots is exactly what we want for the Autumn collection. Let's pull more references like this!",
          timestamp: "2026-07-19T11:20:00Z",
          reactions: [{ emoji: "💯", count: 4 }],
        },
        {
          id: "msg-fi3",
          userId: "user-sketch",
          text: "Based on your saved inspo images, I'm detecting a strong preference for: muted earthy tones, oversized silhouettes, and minimalist accessories. This aligns with the 'quiet luxury' trend. Want me to generate a full trend report and pull similar runway references? 🤖🎨",
          timestamp: "2026-07-19T11:30:00Z",
          reactions: [{ emoji: "🧠", count: 7 }, { emoji: "✨", count: 4 }],
        },
      ],
      files: [
        {
          id: "file-fi1",
          name: "Summer Editorial Refs.zip",
          type: "archive",
          size: "85 MB",
          uploadedBy: "user-member",
          uploadedAt: "2026-07-19T10:50:00Z",
        },
        {
          id: "file-fi2",
          name: "Quiet Luxury Moodboard.pdf",
          type: "pdf",
          size: "6.1 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-19T11:15:00Z",
        },
      ],
      tabs: [
        { id: "tab-fi-overview", label: "Overview", icon: "🏠" },
        { id: "tab-fi-messages", label: "Messages", icon: "💬" },
        { id: "tab-fi-files", label: "Files", icon: "📁" },
        { id: "tab-fi-gallery", label: "Gallery", icon: "🖼️" },
      ],
    },
    {
      id: "room-fashion-collections",
      name: "Collections",
      icon: "👗",
      type: "planning",
      messages: [
        {
          id: "msg-fc1",
          userId: "user-admin",
          text: "Autumn/Winter 2026 collection kickoff! Theme: 'Urban Nomad' — structured layers, earthy tones, statement boots. Let's align on our 12-piece lineup.",
          timestamp: "2026-07-20T10:00:00Z",
          reactions: [{ emoji: "👗", count: 5 }, { emoji: "🍂", count: 3 }],
        },
        {
          id: "msg-fc2",
          userId: "user-member",
          text: "Love the 'Urban Nomad' direction! Can we add some unexpected pops of terracotta? Also can we revisit the boot silhouette — thinking something more sculptural.",
          timestamp: "2026-07-20T10:15:00Z",
          reactions: [{ emoji: "💕", count: 4 }],
        },
        {
          id: "msg-fc3",
          userId: "user-sketch",
          text: "Terracotta is trending +240% on runway search this season — great instinct! I've also flagged 3 silhouettes from recent shows that match your 'sculptural boot' vision. Added to Files. I'll set a milestone reminder for the lookbook shoot in 6 weeks 📅",
          timestamp: "2026-07-20T10:25:00Z",
          reactions: [{ emoji: "🎯", count: 6 }],
        },
      ],
      files: [
        {
          id: "file-fc1",
          name: "AW26 Collection Brief.pdf",
          type: "pdf",
          size: "2.4 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-20T09:45:00Z",
        },
        {
          id: "file-fc2",
          name: "Fabric Swatches.png",
          type: "image",
          size: "3.2 MB",
          uploadedBy: "user-member",
          uploadedAt: "2026-07-20T10:05:00Z",
        },
      ],
      tabs: [
        { id: "tab-fc-overview", label: "Overview", icon: "🏠" },
        { id: "tab-fc-messages", label: "Messages", icon: "💬" },
        { id: "tab-fc-files", label: "Files", icon: "📁" },
        { id: "tab-fc-timeline", label: "Timeline", icon: "📅" },
      ],
    },
    {
      id: "room-fashion-campaigns",
      name: "Campaign HQ",
      icon: "📸",
      type: "execution",
      messages: [
        {
          id: "msg-fca1",
          userId: "user-member",
          text: "Shot list for the SS26 campaign is ready! We've got 3 locations locked — Golden hour at Botanical Garden, urban rooftop, and the studio loft. 📸",
          timestamp: "2026-07-20T14:00:00Z",
          reactions: [{ emoji: "📸", count: 5 }, { emoji: "🌿", count: 3 }],
        },
        {
          id: "msg-fca2",
          userId: "user-admin",
          text: "Confirmed the team: photographer, 2 models, stylist, makeup artist, and art director. Shoot date: August 5th! Let's make it magic. ✨",
          timestamp: "2026-07-20T14:20:00Z",
          reactions: [{ emoji: "🎉", count: 6 }],
        },
        {
          id: "msg-fca3",
          userId: "user-sketch",
          text: "Campaign prep checklist is live in Tasks! I've also analysed your previous campaign's engagement — posts with natural lighting outperformed studio shots by 68%. Botanical Garden location is your strongest bet for hero shots 🌿📊",
          timestamp: "2026-07-20T14:35:00Z",
          reactions: [{ emoji: "💡", count: 7 }],
        },
      ],
      files: [
        {
          id: "file-fca1",
          name: "SS26 Shot List.pdf",
          type: "pdf",
          size: "890 KB",
          uploadedBy: "user-member",
          uploadedAt: "2026-07-20T13:45:00Z",
        },
        {
          id: "file-fca2",
          name: "Location Scouting Photos.zip",
          type: "archive",
          size: "210 MB",
          uploadedBy: "user-admin",
          uploadedAt: "2026-07-20T14:00:00Z",
        },
      ],
      tabs: [
        { id: "tab-fca-overview", label: "Overview", icon: "🏠" },
        { id: "tab-fca-messages", label: "Messages", icon: "💬" },
        { id: "tab-fca-files", label: "Files", icon: "📁" },
        { id: "tab-fca-tasks", label: "Tasks", icon: "✅" },
      ],
    },
  ],
};

export const WORKSPACES = [SOCCER_WORKSPACE, FASHION_WORKSPACE];

export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getUserById(id) {
  return Object.values(USERS).find((u) => u.id === id);
}
