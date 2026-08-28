/**
 * Hardcoded Script Generation Engine
 * Generates tailored, high-quality scripts across multiple content categories
 * without relying on external AI API keys.
 */

export function buildHardcodedScript({
  contentType = "Script",
  tone = "Engaging",
  audience = "General Audience",
  topic = "Interesting Topic",
  platform = "Video",
  duration = "60 seconds",
  characters = "Narrator"
}) {
  const cleanType = (contentType || "").toLowerCase().trim();
  const cleanTone = tone || "Engaging";
  const cleanAudience = audience || "General audience";
  const cleanTopic = topic || "The Future of Innovation";
  const cleanPlatform = platform || "Social Media";
  const cleanDuration = duration || "60 seconds";
  const cleanCharacters = characters || "Protagonist";

  // Category detection
  if (
    cleanType.includes("reel") ||
    cleanType.includes("tiktok") ||
    cleanType.includes("short") ||
    cleanPlatform.toLowerCase().includes("instagram") ||
    cleanPlatform.toLowerCase().includes("tiktok")
  ) {
    return generateReelScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("movie") ||
    cleanType.includes("film") ||
    cleanType.includes("cinema") ||
    cleanType.includes("screenplay") ||
    cleanType.includes("drama")
  ) {
    return generateMovieScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("youtube") ||
    cleanType.includes("explainer") ||
    cleanType.includes("tutorial") ||
    cleanType.includes("essay") ||
    cleanPlatform.toLowerCase().includes("youtube")
  ) {
    return generateYouTubeScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("ad") ||
    cleanType.includes("commercial") ||
    cleanType.includes("promo") ||
    cleanType.includes("brand") ||
    cleanType.includes("marketing") ||
    cleanType.includes("pitch")
  ) {
    return generateAdScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("podcast") ||
    cleanType.includes("interview") ||
    cleanType.includes("radio") ||
    cleanType.includes("talk")
  ) {
    return generatePodcastScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("comedy") ||
    cleanType.includes("skit") ||
    cleanType.includes("standup") ||
    cleanType.includes("parody")
  ) {
    return generateComedyScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  if (
    cleanType.includes("education") ||
    cleanType.includes("lecture") ||
    cleanType.includes("course") ||
    cleanType.includes("masterclass")
  ) {
    return generateEducationalScript(cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
  }

  // Default fallback generator for any other category
  return generateGenericScript(contentType, cleanTopic, cleanTone, cleanAudience, cleanPlatform, cleanDuration, cleanCharacters);
}

// 1. Short-Form Video / Reels / TikTok / Shorts
function generateReelScript(topic, tone, audience, platform, duration, characters) {
  return {
    title: `The Ultimate ${tone} Breakdown: ${topic}`,
    hook: `[Visual: Fast-paced zoom-in, eye-catching text overlay on screen]\n"Stop scrolling! If you're a ${audience}, you need to know this truth about ${topic} before it's too late."`,
    body: `[0:00 - 0:10] Quick Problem Setup:\nMost people get ${topic} completely wrong because they overlook the single most important detail.\n\n[0:10 - 0:35] The Big Reveal & Breakdown:\nHere is how it actually works in practice:\n1. The Hidden Reality: Notice how ${topic} impacts daily decisions.\n2. The Game Changer: When you approach it with a ${tone.toLowerCase()} mindset, everything shifts.\n3. The Pro Tip: Apply this immediately to see results without wasted effort.\n\n[0:35 - ${duration}] Final Takeaway:\nMastering this gives you an unfair advantage in today's fast-moving world.`,
    dialogues: `${characters || "Host"}: "You won't believe what happens when you test this yourself."\nOff-screen voice: "Wait, does this actually work for ${audience}?"\n${characters || "Host"}: "100%. Watch until the end and see the results!"`,
    cta: `Double tap if you learned something new! Drop a comment below with your thoughts on ${topic}, and follow for more daily insights.`
  };
}

// 2. Movie Script / Short Film / Cinematic Screenplay
function generateMovieScript(topic, tone, audience, platform, duration, characters) {
  const charList = (characters || "").includes(",") 
    ? characters.split(",").map(c => c.trim()) 
    : [characters || "PROTAGONIST", "ALLY"];
  const char1 = charList[0] || "PROTAGONIST";
  const char2 = charList[1] || "SUPPORTING CHARACTER";

  return {
    title: `Echoes of Fate: A Story of ${topic}`,
    hook: `[SCENE START]\nEXT. URBAN ROOFTOP - DUSK\nRain pours down against dimly lit neon lights. The atmosphere is tense, heavy, and undeniably ${tone.toLowerCase()}.\n\n${char1.toUpperCase()} stands near the ledge, gripping a worn notebook detailing everything about ${topic}.`,
    body: `ACT I: THE DISCOVERY\n${char1} uncovers the hidden truth behind ${topic}. What initially seemed like an ordinary circumstance rapidly escalates into a high-stakes turning point designed for ${audience}.\n\nACT II: CONFRONTATION & CONFLICT\nTensions rise as ${char2} confronts ${char1}. The choices made regarding ${topic} will irreversibly change their future.\n\nACT III: RESOLUTION\nA climactic reveal ties together the central theme of ${topic}, delivering an emotional and thought-provoking climax that resonates deeply with the viewer.`,
    dialogues: `${char1.toUpperCase()}: (whispering, looking out at the skyline)\n"We were never supposed to find out the truth about ${topic}."\n\n${char2.toUpperCase()}: (stepping forward from the shadows)\n"And yet here we are. The question is, what are you going to do now that everyone knows?"\n\n${char1.toUpperCase()}: (resolute)\n"We finish what we started."`,
    cta: `[FADE TO BLACK]\n"Some truths cannot be hidden forever."\n(Screenplay target run-time: ${duration} - Crafted for ${platform}).`
  };
}

// 3. YouTube Video / Explainer / Deep-Dive
function generateYouTubeScript(topic, tone, audience, platform, duration, characters) {
  return {
    title: `Why Nobody Is Talking About ${topic} (Complete ${tone} Guide)`,
    hook: `[Camera: Medium close-up, dynamic background music kicks in]\n"What if everything you've been told about ${topic} is only half the story? In today's video, we're doing a full ${duration} deep dive tailored specifically for ${audience}."`,
    body: `[CHAPTER 1: Introduction & The Core Problem - 0:00]\nWelcome back to the channel. Today, we're dissecting ${topic} from a completely fresh perspective with a ${tone.toLowerCase()} approach.\n\n[CHAPTER 2: Deep Dive & Analysis]\nLet's break this down into three essential parts:\n- Part 1: How we got here and why traditional approaches fail.\n- Part 2: The exact framework you need to navigate ${topic}.\n- Part 3: Real-world examples and case studies.\n\n[CHAPTER 3: Practical Action Steps]\nHere is the exact roadmap you can implement right away to stay ahead.`,
    dialogues: `${characters || "Presenter"}: "Let me know in the comments: have you ever experienced this issue with ${topic}?"\n${characters || "Presenter"}: "If you're finding value so far, hit that thumbs up button—it helps the algorithm immensely!"`,
    cta: `If you enjoyed this breakdown on ${topic}, subscribe and ring the notification bell! Check out the top link in the description for bonus resources.`
  };
}

// 4. Advertising / Commercial / Brand Promo
function generateAdScript(topic, tone, audience, platform, duration, characters) {
  return {
    title: `Next-Gen Solution: Unleash the Power of ${topic}`,
    hook: `[Visual: Frustrated individual struggling with standard routines. Crisp sound effect.]\n"Are you tired of settling for average results with ${topic}? If you're a ${audience}, your wait is finally over."`,
    body: `[PROBLEM STATEMENT - First 15%]\nTraditional approaches to ${topic} are slow, outdated, and exhausting.\n\n[SOLUTION INTRODUCTION - Next 50%]\nIntroducing the revolutionary new way to master ${topic}. Crafted with a ${tone.toLowerCase()} philosophy, it empowers you to achieve seamless results in just ${duration}.\n- 10x more efficient workflow\n- Designed specifically for modern creators and professionals\n- Guaranteed impact from day one\n\n[SOCIAL PROOF & REINFORCEMENT - Next 25%]\nTrusted by thousands of ${audience} worldwide who have already made the switch.`,
    dialogues: `${characters || "Satisfied User"}: "I used to spend hours struggling with ${topic}. Now it takes me seconds!"\nVoiceover: "Upgrade your journey today with unmatched ease."`,
    cta: `Don't wait—visit our website or click the link below to get an exclusive launch discount on ${topic} today!`
  };
}

// 5. Podcast / Audio / Interview
function generatePodcastScript(topic, tone, audience, platform, duration, characters) {
  const hosts = (characters || "").includes(",") ? characters.split(",") : ["Host", "Special Guest"];
  const host1 = hosts[0].trim() || "Host";
  const host2 = (hosts[1] || "Guest").trim();

  return {
    title: `Episode 42: Unpacking ${topic} with Special Insights`,
    hook: `[Intro Jingle plays softly in background]\n"Welcome back to the show! Today, we have a very special episode for our ${audience}. We are diving headfirst into ${topic} with a ${tone.toLowerCase()} conversation you won't want to miss."`,
    body: `[EPISODE OVERVIEW - Estimated Length: ${duration}]\n- Segment 1: Welcome & Introducing our special focus on ${topic}.\n- Segment 2: Breaking myths and uncovering what really matters.\n- Segment 3: Listener Q&A and insider secrets.\n- Segment 4: Key takeaways for our community of ${audience}.`,
    dialogues: `${host1}: "Welcome to the mic! When you first began exploring ${topic}, what was the biggest surprise?"\n\n${host2}: "Honestly, it was how misunderstood ${topic} is by most people. Once you realize the true potential, everything changes."\n\n${host1}: "That is such a profound perspective for anyone listening right now."`,
    cta: `Thank you for tuning in! Make sure to rate us 5 stars on ${platform}, leave a review, and share this episode with someone passionate about ${topic}.`
  };
}

// 6. Comedy / Skit / Standup
function generateComedyScript(topic, tone, audience, platform, duration, characters) {
  const performers = (characters || "").includes(",") ? characters.split(",") : ["Comedian", "Straight Man"];
  const comic = performers[0].trim() || "Comedian";
  const friend = (performers[1] || "Friend").trim();

  return {
    title: `When ${topic} Goes Horribly Wrong (${tone} Comedy)`,
    hook: `[Visual: Awkward silence, character stares deadpan into the camera]\n"You ever wake up, look at your life, and realize you know absolutely nothing about ${topic}? Yeah, that was me this morning."`,
    body: `[SCENE 1: The Setup]\n${comic} attempts to explain ${topic} to ${audience} with absolute confidence despite having zero qualifications.\n\n[SCENE 2: The Escalation]\nThings spiral out of control when ${friend} asks one simple question that dismantles the entire argument.\n\n[SCENE 3: The Punchline & Resolution]\nA hilarious realization about how everyone is just pretending to understand ${topic} anyway.`,
    dialogues: `${comic}: "Look, understanding ${topic} is simple. Step one: Act like you know what you're doing."\n\n${friend}: "And step two?"\n\n${comic}: "Panic. Pure, unfiltered panic."`,
    cta: `If this gave you a laugh, smash that share button! Tag a friend who desperately needs help with ${topic}.`
  };
}

// 7. Educational / Lecture / Masterclass
function generateEducationalScript(topic, tone, audience, platform, duration, characters) {
  return {
    title: `Mastering ${topic}: A Comprehensive ${tone} Masterclass`,
    hook: `[Visual: Clean minimalist whiteboard / presentation slide]\n"Welcome students and learners. By the end of this ${duration} masterclass, you will have a clear, actionable mastery of ${topic} designed specifically for ${audience}."`,
    body: `[MODULE 1: Foundational Principles]\nUnderstanding the core mechanics of ${topic}.\n\n[MODULE 2: Real-World Applications]\nExamining how top practitioners utilize ${topic} in practical scenarios with a ${tone.toLowerCase()} methodology.\n\n[MODULE 3: Advanced Concepts & Common Pitfalls]\nAvoiding frequent mistakes and optimizing your approach for long-term success.`,
    dialogues: `${characters || "Instructor"}: "Let us pause here. Can anyone identify why this step in ${topic} is critical?"\n${characters || "Instructor"}: "Notice how the foundational theory directly translates into real-world efficiency."`,
    cta: `Download the complete workbook and supplementary notes in the course portal. Be sure to complete the exercise before the next module!`
  };
}

// 8. Generic / Customizable Default Generator
function generateGenericScript(contentType, topic, tone, audience, platform, duration, characters) {
  return {
    title: `${contentType || "Script"}: The Definitive Guide to ${topic}`,
    hook: `[Opening Hook - ${tone} Delivery]\n"Welcome! If you're passionate about ${topic} and want insights tailored for ${audience}, this ${duration} presentation on ${platform} is made for you."`,
    body: `OVERVIEW & CONTEXT:\nA detailed look into ${topic}, crafted with a ${tone.toLowerCase()} perspective.\n\nKEY HIGHLIGHTS:\n1. Introduction to the core dynamics of ${topic}.\n2. Deep dive into practical applications and strategies.\n3. Essential tips for ${audience} to achieve optimum results.\n\nSUMMARY:\nBringing together all elements to provide a comprehensive, engaging experience.`,
    dialogues: `${characters || "Host"}: "The most vital element of ${topic} is understanding its core impact."\n${characters || "Co-Host / Guest"}: "Precisely. When tailored for ${audience}, the results speak for themselves."`,
    cta: `Thank you for watching! Share your thoughts on ${topic} in the comments, and stay tuned for more content on ${platform}.`
  };
}
