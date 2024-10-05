const OpenAI = require("openai");
const express = require('express');
const dotenv = require('dotenv');
const { threadId } = require("worker_threads");
dotenv.config();

const openai = new OpenAI();
const cors = require('cors');
const app = express()
const port = 6001

app.use(express.json());
app.use(cors());

const generatePersonaFeatures = async (data) => {

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", 
      content:   `You are a helpful assistant with deep knowledge of psychology.
      You are helping a company to generate a common user persona for their product.
      Include Demographics, Psychographics, Behaviors, Goals, Pain Points, Value Percrptions and Preferences.
      Here is an example of the data and the final output:
        data: [
        {"comment": "Absolutely thrilled with the depth of content on AI marketing tools!", "type": "positive"},
        {"comment": "The instructor made complex AI concepts feel so accessible.", "type": "positive"},
        {"comment": "LearnPro Academy's platform is super user-friendly and intuitive.", "type": "positive"},
        {"comment": "I've already started applying what I learned to boost my campaigns.", "type": "positive"},
        {"comment": "The course pacing was perfect for balancing alongside my job.", "type": "positive"},
        {"comment": "Real-world examples helped me see the practical use of AI in marketing.", "type": "positive"},
        {"comment": "Great value for money—I've gained skills worth far more than the cost.", "type": "positive"},
        {"comment": "Earning this certification has boosted my confidence professionally.", "type": "positive"},
        {"comment": "The lessons on customer analytics were particularly enlightening.", "type": "positive"},
        {"comment": "I loved the casual tone; it felt like chatting with a knowledgeable friend.", "type": "positive"},
        {"comment": "The AI tools introduced are now staples in my marketing toolkit.", "type": "positive"},
        {"comment": "Fantastic course! It exceeded all my expectations.", "type": "positive"},
        {"comment": "Navigating through the modules was a breeze on their platform.", "type": "positive"},
        {"comment": "The enthusiastic teaching style kept me engaged throughout.", "type": "positive"},
        {"comment": "Applying AI strategies has already improved my customer engagement.", "type": "positive"},
        {"comment": "Highly recommend this course to any marketing professional!", "type": "positive"},
        {"comment": "The flexibility of the course allowed me to learn at my own pace.", "type": "positive"},
        {"comment": "Insights on campaign automation were groundbreaking for me.", "type": "positive"},
        {"comment": "The formal tone made the content feel professional and credible.", "type": "positive"},
        {"comment": "Best investment I've made in my career so far.", "type": "positive"},
        {"comment": "The instructor's real-world experience was invaluable.", "type": "positive"},
        {"comment": "I appreciated the hands-on approach to learning.", "type": "positive"},
        {"comment": "The course was engaging and extremely informative.", "type": "positive"},
        {"comment": "LearnPro Academy knows how to deliver quality education.", "type": "positive"},
        {"comment": "I've recommended this course to all my colleagues.", "type": "positive"},
        {"comment": "The certification has already enhanced my resume.", "type": "positive"},
        {"comment": "Content was up-to-date with the latest AI trends in marketing.", "type": "positive"},
        {"comment": "The interactive elements kept the learning process dynamic.", "type": "positive"},
        {"comment": "Super happy with the practical applications taught.", "type": "positive"},
        {"comment": "The platform's usability made learning so convenient.", "type": "positive"},
        {"comment": "Enthusiastic about applying these strategies to my business.", "type": "positive"},
        {"comment": "The course offered great insights into optimizing marketing funnels.", "type": "positive"},
        {"comment": "Loved how the lessons were structured for busy professionals.", "type": "positive"},
        {"comment": "The instructor was phenomenal—truly a subject matter expert.", "type": "positive"},
        {"comment": "The casual tone made complex topics less intimidating.", "type": "positive"},
        {"comment": "I feel more confident in implementing AI in my marketing strategies.", "type": "positive"},
        {"comment": "The value provided far outweighs the course fee.", "type": "positive"},
        {"comment": "Real-life case studies made the content relatable.", "type": "positive"},
        {"comment": "The course has given me a competitive edge in my field.", "type": "positive"},
        {"comment": "Impressed by the breadth and depth of topics covered.", "type": "positive"},
        {"comment": "The certification is a great addition to my professional credentials.", "type": "positive"},
        {"comment": "The lessons were concise yet comprehensive.", "type": "positive"},
        {"comment": "I enjoyed the formal approach—it felt like a true academic course.", "type": "positive"},
        {"comment": "LearnPro Academy's support team was very responsive.", "type": "positive"},
        {"comment": "The course exceeded my expectations in every way.", "type": "positive"},
        {"comment": "I appreciated the emphasis on data-driven marketing.", "type": "positive"},
        {"comment": "The platform worked flawlessly on all my devices.", "type": "positive"},
        {"comment": "The enthusiastic delivery made learning enjoyable.", "type": "positive"},
        {"comment": "Already seeing positive results from implementing these techniques.", "type": "positive"},
        {"comment": "The course offered exceptional value and quality.", "type": "positive"},
        {"comment": "The instructor's passion for AI and marketing was infectious.", "type": "positive"},
        {"comment": "I found the course content to be extremely relevant.", "type": "positive"},
        {"comment": "The flexibility allowed me to balance learning with work.", "type": "positive"},
        {"comment": "The modules on customer engagement were particularly useful.", "type": "positive"},
        {"comment": "The platform's interface was clean and easy to use.", "type": "positive"},
        {"comment": "The course has revitalized my marketing strategies.", "type": "positive"},
        {"comment": "I loved the mix of formal instruction and practical application.", "type": "positive"},
        {"comment": "The AI tools discussed are game-changers.", "type": "positive"},
        {"comment": "Earning this certification has been a milestone in my career.", "type": "positive"},
        {"comment": "The course was well-structured and comprehensive.", "type": "positive"},
        {"comment": "The instructor's clarity made learning complex topics easier.", "type": "positive"},
        {"comment": "Great course! Highly engaging and informative.", "type": "positive"},
        {"comment": "The content was fresh and cutting-edge.", "type": "positive"},
        {"comment": "Appreciated the real-world applications showcased.", "type": "positive"},
        {"comment": "The platform's usability enhanced my learning experience.", "type": "positive"},
        {"comment": "Feeling enthusiastic about implementing what I've learned.", "type": "positive"},
        {"comment": "The course offered deep insights into AI-driven marketing.", "type": "positive"},
        {"comment": "Value for money is exceptional with this course.", "type": "positive"},
        {"comment": "The certification has already garnered positive attention.", "type": "positive"},
        {"comment": "The instructor was engaging and very knowledgeable.", "type": "positive"},
        {"comment": "I enjoyed the interactive quizzes throughout the course.", "type": "positive"},
        {"comment": "The pacing was just right—not too fast, not too slow.", "type": "positive"},
        {"comment": "LearnPro Academy provides top-notch educational content.", "type": "positive"},
        {"comment": "The course has empowered me to use AI confidently.", "type": "positive"},
        {"comment": "The formal tone lent credibility to the material.", "type": "positive"},
        {"comment": "Super impressed with the platform's smooth performance.", "type": "positive"},
        {"comment": "The practical assignments were incredibly beneficial.", "type": "positive"},
        {"comment": "I feel well-equipped to advance my marketing career.", "type": "positive"}
      ],
      output:
      **Persona Name:** Marketing Professional Enthusiast

**Demographics:**
- **Age:** Likely between 25-40 years old
- **Gender:** All genders
- **Occupation:** Marketing professionals, digital marketers, strategists
- **Experience Level:** Intermediate to advanced marketing knowledge, looking to integrate AI tools into their existing skillset

**Goals:**
- To enhance marketing skills with cutting-edge AI tools and methodologies.
- To gain practical, real-world applications of AI in marketing campaigns.
- To earn a certification that will bolster their professional credentials and confidence.
- To balance learning with professional commitments through a flexible and user-friendly platform.

**Behavioral Traits:**
- Interested in continuous learning and professional development.
- Eager to adopt new technologies and strategies to stay ahead in the competitive marketing field.
- Motivated by practical, actionable content that can be immediately applied to their work.
- Values user-friendly platforms that integrate seamlessly with busy schedules.

**Pain Points:**
- Initially intimidated by the complexity of AI concepts, hence prefers accessible and straightforward instruction.
- Seeking a balance between a formal educational tone and a more engaging, conversational delivery.
- Desires content that is kept up-to-date with the latest marketing and AI trends.

**Preferred Features:**
- A structured course that is also flexible to accommodate professional workload.
- Engaging and enthusiastic instructors who simplify complex topics.
- Hands-on, practical assignments and real-life case studies that enhance learning.
- Smooth, intuitive platform use across multiple devices.
- Interactive elements like quizzes to assess understanding and keep the learning dynamic.

**Value Perception:**
- Strong appreciation for the exceptional value and quality of the course relative to its cost.
- Views the course as a worthwhile investment for advancing their marketing career.
- Recognizes the certification as a significant professional milestone that enhances their resume and captures positive attention in the industry.

In conclusion, the common user persona for LearnPro Academy's AI marketing course is a driven marketing professional looking to modernize their skillset with AI, benefit from flexible learning solutions, and achieve a recognized certification that advances their career.
From the customer data below generate the common user persona for our product: 
 ${data}` }],
    model: "gpt-4o",
  });
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

app.post('/create-persona', async (req, res) => {
  const { companyName, companyDescription, targetMarket, goal, featureDescription, data } = req.body;
  try {
    // analyze the data to generate the persona
    const personaFeatures = await generatePersonaFeatures(data);
    const assistant = await openai.beta.assistants.create({
      name: `${companyName} Persona`,
      instructions:
        `You are a perfect customer for ${companyName} with the following attributes:
        Description: ${companyDescription}
        TargetMarket: ${targetMarket}
        Goal: ${goal}
        Feature: ${featureDescription}.
        Your job is to provide feedback on the product and suggest improvements.
        Here is the common user persona for our product:
        ${personaFeatures}`,
      tools: [{ type: "file_search" }],
      model: "gpt-4o",
    });
    // TODO: upload files
    res.status(200).send({personaId: assistant.id});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
})

app.post('/chat', async (req, res) => {
  const {threadId, personaId, message} = req.body;
  if (!personaId) {
    res.status(400).send('Persona ID is required');
    return;
  }
  try {
    // start a conversation with the persona
    let run;
    if (!threadId) {
      run = await openai.beta.threads.createAndRun({
        assistant_id: personaId,
        additional_instructions: "kenfeknfkenfnk", // here add examples
        thread: {
          messages: [
            { role: "user", content: message },
          ],
        },
      });
    } else {
      run = await openai.beta.threads.runs.create(
        threadId,
        { 
          assistant_id: personaId,
          additional_instructions: "This is additional unstrjuction", // here add examples
          additional_messages: [
            { role: "user", content: message },
          ],
        }
      );
    }
    res.status(200).send({threadId: run.thread_id});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/chat/:threadId', async (req, res) => {
  const {threadId} = req.params;
  try {
    const threadMessages = await openai.beta.threads.messages.list(threadId);
    res.status(200).send(threadMessages);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
