import Script from "../models/Script.js";

export const generateScript = async (req, res) => {
  const { contentType, tone, audience, topic, platform, duration, characters } = req.body;

  const charText = characters ? ` Featuring ${characters} characters/performers.` : "";
  const toneText = tone ? ` The tone is highly ${tone}.` : "";
  const durationText = duration ? ` Expected to run for ${duration}.` : "";
  const platformText = platform ? ` Optimized for ${platform}.` : "";

  // Simulate longer AI logic
  let generatedText = {};
  
  if (contentType === "Movie Script") {
    generatedText = {
      title: `The Story of ${topic}`,
      hook: `FADE IN: A desolate landscape. The silence is broken by ${topic}. Slowly, the camera pans to reveal the hidden truth that no one wanted to admit.`,
      body: `ACT 1: The journey begins with our heroes facing the unimaginable. The stakes have never been higher. As they navigate the treacherous terrain, secrets are uncovered, and loyalties are tested. This is a story about resilience, betrayal, and ultimately, redemption. The environment itself seems to be working against them, throwing obstacle after obstacle in their path.\n\nACT 2: The tension rises. A shocking discovery changes everything they thought they knew about their mission.${charText}${toneText}\n\nACT 3: The climax approaches. The final showdown is inevitable. Everything hinges on a single, impossible choice.`,
      dialogues: `LEAD 1: I never thought it would come to this. We've lost too much already.\nLEAD 2: We can't turn back now. It's the only way to make it right.\nVILLAIN: You're fools to think you can change fate!\nLEAD 1: Watch us.`,
      cta: "Coming soon to theaters."
    };
  } else if (contentType === "Stand-up Comedy") {
    generatedText = {
      title: `Observations on ${topic}`,
      hook: `Have you ever noticed how weird ${topic} is? Like, who actually sat down and decided that was a good idea?`,
      body: `I mean, you go there and everyone is just staring at their phones, pretending to be busy. It's like a collective hallucination we've all agreed to participate in. And don't get me started on the people who take it way too seriously. You know the type. They show up with full gear for something that requires zero effort. It's exhausting just watching them.${charText}${toneText}\n\nBut seriously, the wildest part is when you try to explain it to someone from another country. They look at you like you're completely insane. And honestly? They're probably right.`,
      dialogues: `ME: Can I get a coffee? Just a regular coffee.\nBARISTA: That'll be 12 dollars. Did you want to add a shot of existential dread for 50 cents?\nME: ...Make it a double.`,
      cta: "Thank you, goodnight! You've been a wonderful audience!"
    };
  } else if (contentType === "Brand Ad") {
    generatedText = {
      title: `${topic} Commercial`,
      hook: `Are you tired of dealing with the frustration of ${topic}? You're not alone. Millions of people struggle with this every single day.`,
      body: `Introducing the revolutionary new product that changes everything. With just one use, you'll see a dramatic difference in how you approach your daily routine. No more stress, no more hassle. Just seamless perfection designed specifically for your lifestyle. We've spent years engineering the perfect solution, testing it rigorously to ensure it meets the highest standards of quality and performance.${charText}${platformText}${durationText}\n\nImagine waking up tomorrow knowing that ${topic} is no longer a problem. That's the peace of mind we offer.`,
      dialogues: `ACTOR 1: Wow, it really works! I can't believe how much time I've saved.\nACTOR 2: I know, right? It's completely changed the way I work.\nVOICEOVER: Don't wait. Transform your life today.`,
      cta: `Buy now and get 50% off your first order! Visit our website today.`
    };
  } else {
    // Default fallback
    generatedText = {
      title: `${contentType} about ${topic}`,
      hook: `Imagine this: ${topic} in a way you've never seen before. A fresh perspective that challenges everything you know.`,
      body: `This is a comprehensive, AI-generated script tailored specifically for ${audience}. We've taken the core concepts of ${topic} and expanded them to create a compelling narrative flow. Whether you're presenting to a boardroom or entertaining an auditorium, this content is designed to keep them engaged from start to finish.\n\nThe pacing is carefully crafted to build momentum, leading to a satisfying conclusion that drives your message home.${charText}${toneText}${durationText}`,
      dialogues: "SPEAKER 1: Welcome everyone. Today, we're discussing something that affects us all.\nSPEAKER 2: Exactly. The implications of this are far-reaching.\nSPEAKER 1: Let's dive right in.",
      cta: `If you found this valuable, please share it with your network and subscribe for more insights.`
    };
  }

  res.json({ generatedText });
};

export const saveScript = async (req, res) => {
  try {
    const { contentType, tone, audience, topic, platform, duration, generatedText } = req.body;
    
    const saved = await Script.create({
      userId: req.user.id,
      contentType,
      tone,
      audience,
      topic,
      platform,
      duration,
      generatedText
    });
    
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const scripts = await Script.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};