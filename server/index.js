const OpenAI = require("openai");
const express = require('express');
const dotenv = require('dotenv');
const fs = require("fs");
const { threadId } = require("worker_threads");
dotenv.config();

const openai = new OpenAI();

const app = express()
const port = 6000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const generatePersonaFeatures = async (data) => {

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", 
      content:   `You are a helpful assistant with deep knowledge of psychology.
      You are helping a company to generate a common user persona for their product.
      Include Demographics, Psychographics, Behaviors, Goals, Pain Points, Value Perceptions and Preferences.
      Here is an example of the data and the final output:
        data:
        [ 
          {"comment": "The programming course was incredibly comprehensive and easy to follow.", "type": "positive"},
          {"comment": "I loved the interactive coding challenges; they really helped solidify my understanding.", "type": "positive"},
          {"comment": "The instructor explained complex topics in a simple and relatable way.", "type": "positive"},
          {"comment": "The platform's user interface is intuitive and user-friendly.", "type": "positive"},
          {"comment": "I appreciated the real-world projects included in the curriculum.", "type": "positive"},
          {"comment": "The course provided a solid foundation in programming fundamentals.", "type": "positive"},
          {"comment": "Great value for money; I learned more than I expected.", "type": "positive"},
          {"comment": "The lessons were well-structured and easy to digest.", "type": "positive"},
          {"comment": "I feel confident to start my own programming projects now.", "type": "positive"},
          {"comment": "The quizzes after each module were very helpful in testing my knowledge.", "type": "positive"},
          {"comment": "The instructor was engaging and kept me interested throughout.", "type": "positive"},
          {"comment": "The course covered all the essential topics in depth.", "type": "positive"},
          {"comment": "I liked the flexibility of being able to learn at my own pace.", "type": "positive"},
          {"comment": "The support team was responsive and helpful when I had questions.", "type": "positive"},
          {"comment": "The coding exercises were challenging but rewarding.", "type": "positive"},
          {"comment": "I appreciated the up-to-date content reflecting current industry practices.", "type": "positive"},
          {"comment": "The course community was active and supportive.", "type": "positive"},
          {"comment": "The platform worked smoothly on all my devices.", "type": "positive"},
          {"comment": "I enjoyed the instructor's teaching style and sense of humor.", "type": "positive"},
          {"comment": "The course has significantly improved my programming skills.", "type": "positive"},
          {"comment": "I loved the real-life examples used to explain concepts.", "type": "positive"},
          {"comment": "The video quality was excellent, making it easy to follow along.", "type": "positive"},
          {"comment": "The course exceeded my expectations in every way.", "type": "positive"},
          {"comment": "I feel prepared to apply for programming jobs now.", "type": "positive"},
          {"comment": "The instructor provided clear and concise explanations.", "type": "positive"},
          {"comment": "I liked the mix of theory and practical application.", "type": "positive"},
          {"comment": "The course materials were comprehensive and well-organized.", "type": "positive"},
          {"comment": "I appreciated the regular updates to the course content.", "type": "positive"},
          {"comment": "The platform's progress tracking feature kept me motivated.", "type": "positive"},
          {"comment": "The community forums were a great place to ask questions and learn from others.", "type": "positive"},
          {"comment": "I enjoyed the project-based learning approach.", "type": "positive"},
          {"comment": "The course certificates are a nice addition to my resume.", "type": "positive"},
          {"comment": "The instructor was very knowledgeable and experienced.", "type": "positive"},
          {"comment": "I appreciated the feedback on my assignments.", "type": "positive"},
          {"comment": "The course has a good balance of beginner and advanced topics.", "type": "positive"},
          {"comment": "I liked the downloadable resources provided.", "type": "positive"},
          {"comment": "The course helped me switch careers into programming.", "type": "positive"},
          {"comment": "I found the content engaging and informative.", "type": "positive"},
          {"comment": "The platform's design made it easy to navigate between lessons.", "type": "positive"},
          {"comment": "I highly recommend this course to anyone interested in programming.", "type": "positive"},

          {"comment": "I found the course material too basic for my level.", "type": "negative"},
          {"comment": "The instructor's accent made it difficult to understand the lectures.", "type": "negative"},
          {"comment": "The platform was slow and sometimes unresponsive.", "type": "negative"},
          {"comment": "There were too many technical issues with the video playback.", "type": "negative"},
          {"comment": "The course lacked depth in advanced programming topics.", "type": "negative"},
          {"comment": "I didn't receive enough support when I had questions.", "type": "negative"},
          {"comment": "The assignments were too easy and not challenging.", "type": "negative"},
          {"comment": "I felt the course was overpriced for the content provided.", "type": "negative"},
          {"comment": "The instructor moved too quickly through important concepts.", "type": "negative"},
          {"comment": "I encountered errors in the code examples provided.", "type": "negative"},
          {"comment": "The course didn't cover the programming language I was interested in.", "type": "negative"},
          {"comment": "I found the lessons repetitive and boring.", "type": "negative"},
          {"comment": "The quizzes didn't accurately test my understanding.", "type": "negative"},
          {"comment": "The audio quality of the videos was poor.", "type": "negative"},
          {"comment": "I didn't feel prepared to tackle real-world programming projects after the course.", "type": "negative"},
          {"comment": "The platform was not compatible with my device.", "type": "negative"},
          {"comment": "The instructor was not engaging and lacked enthusiasm.", "type": "negative"},
          {"comment": "I expected more hands-on coding exercises.", "type": "negative"},
          {"comment": "The course content was outdated and didn't reflect current industry practices.", "type": "negative"},
          {"comment": "There was no community interaction or support.", "type": "negative"},
          {"comment": "I didn't receive a certificate upon completion.", "type": "negative"},
          {"comment": "The course was poorly structured and hard to follow.", "type": "negative"},
          {"comment": "The pace of the course was too slow.", "type": "negative"},
          {"comment": "I felt the course didn't offer value for money.", "type": "negative"},
          {"comment": "The instructor didn't explain the code thoroughly.", "type": "negative"},
          {"comment": "I encountered bugs in the platform that hindered my progress.", "type": "negative"},
          {"comment": "The lessons lacked practical application.", "type": "negative"},
          {"comment": "I was disappointed with the lack of advanced topics.", "type": "negative"},
          {"comment": "Customer support was unresponsive to my issues.", "type": "negative"},
          {"comment": "I found the instructor's explanations confusing.", "type": "negative"},
          {"comment": "It would be great to include more advanced programming topics.", "type": "suggestion"},
          {"comment": "Offering live coding sessions could enhance the learning experience.", "type": "suggestion"},
          {"comment": "Including subtitles in different languages would be helpful.", "type": "suggestion"},
          {"comment": "Providing more challenging assignments would be beneficial.", "type": "suggestion"},
          {"comment": "Adding a mobile app for the platform would improve accessibility.", "type": "suggestion"},
          {"comment": "Including a forum for students to collaborate would be useful.", "type": "suggestion"},
          {"comment": "Offering certificates upon completion would add value.", "type": "suggestion"},
          {"comment": "Updating the course content to reflect current trends would be appreciated.", "type": "suggestion"},
          {"comment": "Providing personalized feedback on assignments would enhance learning.", "type": "suggestion"},
          {"comment": "Adding more real-world projects would help apply the concepts.", "type": "suggestion"},
          {"comment": "Including code challenges or hackathons could be engaging.", "type": "suggestion"},
          {"comment": "Offering mentorship opportunities would be beneficial.", "type": "suggestion"},
          {"comment": "Providing downloadable notes would be helpful for offline study.", "type": "suggestion"},
          {"comment": "Including more programming languages in the curriculum would be great.", "type": "suggestion"},
          {"comment": "Improving the audio and video quality would enhance the experience.", "type": "suggestion"},
          {"comment": "Adding closed captions would aid understanding.", "type": "suggestion"},
          {"comment": "Offering a free trial or preview could attract more students.", "type": "suggestion"},
          {"comment": "Including career guidance or job placement assistance would add value.", "type": "suggestion"},
          {"comment": "Providing more interactive elements in the lessons would be engaging.", "type": "suggestion"},
          {"comment": "Implementing progress tracking badges could motivate learners.", "type": "suggestion"},
          {"comment": "Including content on debugging techniques would be helpful.", "type": "suggestion"},
          {"comment": "Offering flexible payment options could make the course more accessible.", "type": "suggestion"},
          {"comment": "Adding quizzes after each lesson could reinforce learning.", "type": "suggestion"},
          {"comment": "Providing a glossary of programming terms would assist beginners.", "type": "suggestion"},
          {"comment": "Including more visual aids like diagrams would enhance understanding.", "type": "suggestion"},
          {"comment": "Offering office hours with the instructor could help address questions.", "type": "suggestion"},
          {"comment": "Integrating peer reviews on assignments could provide diverse feedback.", "type": "suggestion"},
          {"comment": "Adding a section on programming best practices would be beneficial.", "type": "suggestion"},
          {"comment": "Including more examples of code in different contexts would help.", "type": "suggestion"},
          {"comment": "Providing access to an online code editor within the platform would be convenient.", "type": "suggestion"}
        ]
      output:
      ### Common User Persona for the Programming Course Product

#### **Demographics:**
- **Age:** 21-35 years old
- **Gender:** Predominantly male, but inclusive of all genders
- **Education Level:** College students or graduates, often with a background in STEM fields
- **Occupation:** Aspiring programmers, career switchers, and early-career software developers
- **Geographic Location:** Primarily urban areas with access to technology; global audience but primarily English-speaking

#### **Psychographics:**
- **Personality Traits:** Motivated, detail-oriented, problem-solvers, and tech-savvy
- **Values:** Education, career advancement, skill mastery, and practical application of knowledge
- **Interests:** Technology, software development, coding, innovation, and continuous learning
- **Lifestyle:** Balanced between work/study and personal life, enjoys online learning, and seeks flexible schedules

#### **Behaviors:**
- **Learning Style:** Prefers interactive and engaging learning experiences, values real-world projects and practical applications
- **Engagement:** Active in online communities and forums, seeks feedback and support from peers and instructors
- **Technology Use:** Regularly uses laptops and mobile devices for learning, prefers platforms that are user-friendly and responsive
- **Pain Points:** Frustrated by technical issues, outdated content, and lack of advanced topics. Needs more challenging assignments and better support

#### **Goals:**
- **Short-Term Goals:** Master programming fundamentals, complete the course, and build a portfolio of real-world projects
- **Long-Term Goals:** Secure a programming job, switch careers into tech, or advance in their current role. Gain confidence and proficiency in multiple programming languages

#### **Pain Points:**
- **Technical Issues:** Platform slowdowns, unresponsive interface, and poor audio/video quality
- **Content Quality:** Basic material not challenging enough, lack of depth in advanced topics, outdated content
- **Support:** Insufficient support from instructors and customer service, unresponsive community interaction
- **Course Structure:** Poorly structured lessons, repetitive content, and lack of practical application
- **Accessibility:** Incompatibility with devices, lack of subtitles/captions, and no mobile app

#### **Value Perceptions:**
- **Positive Perceptions:** Comprehensive and easy-to-follow course, engaging instructors, real-world projects, and flexibility in learning pace
- **Negative Perceptions:** Overpriced courses, lack of advanced topics, and insufficient support during the course

#### **Preferences:**
- **Learning Environment:** Prefers interactive coding challenges, real-world projects, and a mix of theory and practical application
- **Platform Features:** Intuitive user interface, progress tracking, downloadable resources, and community forums
- **Instructor Qualities:** Engaging, clear, and knowledgeable instructors who provide concise explanations and feedback
- **Course Content:** Up-to-date material reflecting current industry practices, inclusion of multiple programming languages, and a balance of beginner to advanced topics
- **Support Services:** Responsive support team, personalized feedback on assignments, and active community interaction

### Summary:
The typical user of this programming course product is a motivated and tech-savvy individual, aged between 21-35, who values continuous learning and career advancement. They prefer an interactive and engaging learning experience, with a strong emphasis on practical application and real-world projects. They seek a user-friendly platform with responsive support and up-to-date content that caters to both beginners and advanced learners. Their main pain points include technical issues, insufficient support, and a lack of challenging and advanced material. They value clear and engaging instruction, flexible learning options, and a community-driven environment.
From the customer data below generate the common user persona for our product: 
 ${data}` }],
    model: "gpt-4o",
  });
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

const uploadData = async (data) => {
  const id = crypto.randomUUID();
  const path = `data-${id}.txt`;
  fs.writeFileSync(path, data);
  const file = await openai.files.create({
    file: fs.createReadStream(path),
    purpose: "assistants",
  });
  return file.id;
}

app.post('/create-persona', async (req, res) => {
  const { companyName, description, targetMarket, goal, featureDescription, data, productIdea } = req.body;
  try {
    // analyze the data to generate the persona
    const personaFeatures = await generatePersonaFeatures(data);
    fileID = await uploadData(data);
    const vectorStore = await openai.beta.vectorStores.create({
      name: `${companyName} Persona vector store`,
      file_ids: [fileID],
    });
    const assistant = await openai.beta.assistants.create({
      name: `${companyName} Persona`,
      instructions:
        `You are a perfect customer for ${companyName} with the following attributes:
        Description: ${description}
        TargetMarket: ${targetMarket}
        Goal: ${goal}
        Feature: ${featureDescription}.
        Your job is to provide feedback on the product and suggest improvements.
        Here is the common user persona for our product:
        ${personaFeatures}`,
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        }
      },
      model: "gpt-4o",
    });
    const run = await openai.beta.threads.createAndRun({
      assistant_id: assistant.id,
      thread: {
        messages: [
          { role: "user", content: `Hello! What do you think about my ${productIdea}` },
        ],
      },
    });
    res.status(200).send({personaId: assistant.id, threadId: run.thread_id});
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
