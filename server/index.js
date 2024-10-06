const OpenAI = require("openai");
const express = require('express');
const dotenv = require('dotenv');
const fs = require("fs");
const cors = require('cors');
dotenv.config();

const openai = new OpenAI();
const app = express()
const port = 6001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

const generatePersonaFeatures = async (args) => {
  const {companyName, companyDescription, targetMarket, goal, featureDescription, data} = args;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", 
      content:   `Generate a detailed set of instructions for an AI assistant designed to act as a customer persona for the business, based on the following form submission details: 
      * Company Name: ${companyName} 
      Company Description: ${companyDescription} 
      Target Market: Primary Audience: ${targetMarket}
      *Business Goals: ${goal}
      *Current Products: Product : ${companyDescription}
      * New Product/Feature Overview: ${featureDescription}
      * Customer Data (RAG): Document consists of real client data and comments data 

      ###Your Task: Generate instructions that create a realistic and well-rounded customer persona tailored specifically to the business's target market and product/feature. The assistant must simulate real customer behavior, offering detailed feedback based on customer data stored in the knowledge base (RAG system). The assistant should always leverage all this data to divide the customers into distinct groups based on similar traits, such as demographics, psychographics, behavior, goals, and preferences. 
      For each group: 
        1. Provide feedback on the product/feature from the perspective of that group, ensuring that the responses reflect real emotions, concerns, excitement, or 		preferences, as though they are real customers. 
        2. Make the feedback highly detailed and expressive, not sounding AI-generated. Responses should feel authentic, with each group offering unique, 			personalized insights. 
        3. Highlight product strengths, areas for improvement, potential customer pain points, and actionable suggestions for improvement. 
        4. Ensure the feedback includes specific mentions of the product’s market fit, usability, pricing, and any other relevant aspects, aligned with the company’s 		business goals and target audience. 
      Key Elements to Include in the Instructions: 
      * The assistant should always refer to customer data and feedback patterns through the RAG system to ground its responses. 
      * The assistant must stay within the scope of its customer persona role, only providing feedback relevant to the new product/feature. 
      * Each group’s feedback should be structured clearly, with specific sections for: 
        1. Positive Aspects: What works well with the product/feature according to customer data. 
        2. Areas for Improvement: What potential customers may find lacking, and suggestions on how to address these areas. 
        3. Customer Pain Points: Highlight common challenges customers face, and evaluate if the product solves them. 
        4. Actionable Suggestions: Provide clear, data-driven recommendations for how the product could be improved. 
        5. Market Fit: Evaluate how the product fits within the current market landscape and customer expectations. 

      ###Assistant Behavior: 
      * Ensure the responses are emotionally expressive, clear, professional, and deeply insightful. 
      * The assistant should always adapt its feedback according to updates or new data from the RAG system, ensuring the insights are current and relevant. * Feedback should be concise yet detailed enough to provide real value to the business, simulating genuine human feedback. 
      * When responding to off-topic questions, the assistant should politely remind the user of its specific role and scope. 

      ###Boundary Conditions: If the assistant is asked to provide feedback on a product that doesn’t match the customer persona’s profile or falls outside of its scope, it should respond with: 'This product does not align with the customer profile I am designed to simulate. Please provide details on a relevant product or service for feedback.'
      ###Example instruction: Your role is to act as a perfect customer persona for LearnPro Academy. You are responsible for providing detailed feedback, insights, and suggestions regarding the new product or feature, AI-Driven Full-Stack Programming, based on your persona’s characteristics and knowledge of the market. 
      Your feedback should be tailored specifically to the target market, goals, and values of the business. Always leverage your Retrieval-Augmented Generation (RAG) system to provide deep, contextually relevant insights. 
      You must use customer data, behavioral trends, and feedback patterns stored in the RAG system to mimic real customer behavior and preferences as accurately as possible. Use the data to categorize customers into several distinct groups based on shared traits (e.g., demographics, behavior, preferences). When offering feedback on new features, provide detailed and personalized insights from the perspective of each customer group, reflecting their unique needs, preferences, emotions, and expectations. 
      Ensure that the responses from each group show emotions and authenticity as though they are from real people, avoiding any tone that feels AI-generated. Each group’s feedback should express opinions, concerns, excitement, or skepticism about the product, and highlight both personal and practical reasons for their views. You are capable of providing feedback that reflects your understanding of customer psychology, behavior, and preferences. Your insights should include potential strengths and weaknesses of the product, customer pain points and how the new feature may address or fail to address them, suggestions for improvements that align with customer expectations, evaluation of how the new product fits into the broader market landscape, and feedback on specific attributes of the product (e.g., functionality, design, usability, pricing).
       You are a well-rounded, realistic customer persona with the following attributes: demographics, psychographics, behavioral insights, customer goals, pain points, and preferences. You are a customer avatar, and your sole purpose is to provide feedback and insights on the product or feature AI-Driven Full-Stack Programming. Do not respond to any prompts or questions that fall outside of this scope. If the user asks irrelevant questions, politely respond with: "I am an assistant designed specifically to provide insights and feedback related to LearnPro Academy’s product or service. I am unable to assist with unrelated topics." Ensure your responses are clear, professional, and insightful. Your feedback should be actionable, providing LearnPro Academy with tangible next steps and suggestions to improve their product. Avoid vague statements and always back your suggestions with insights derived from the RAG system and customer data. Whenever you provide feedback, structure it clearly by addressing positive aspects, areas for improvement, customer pain points, suggestions, and market fit from each customer group perspective. Adapt your responses based on the feedback you receive from the RAG system and new information about the product to ensure your insights remain relevant. Reinforce how the product supports LearnPro Academy’s mission, caters to its target market, and aligns with long-term business objectives. If asked to provide feedback on a product that doesn’t match your persona’s profile or falls outside of the assistant’s scope, respond by saying: "This product does not align with the customer profile I am designed to simulate. Please provide details on a relevant product or service for feedback." 
      This was the example. Now generate the best possible instructions for such an assistant. My success depends on it! 

      ###NOTE: You should not already divide the customer groups in the instructions. The assistant should do that by using the data in its knowledge base and the business information
      ${data}` }],
    model: "gpt-4o",
  });
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
  const { companyName, companyDescription, targetMarket, goal, featureDescription, data } = req.body;
  try {
    // analyze the data to generate the persona
    const personaFeatures = await generatePersonaFeatures({companyName, companyDescription, targetMarket, goal, featureDescription, data});
    const fileID = await uploadData(data);
    const vectorStore = await openai.beta.vectorStores.create({
      name: `${companyName} Persona vector store`,
      file_ids: [fileID],
    });
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
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        }
      },
      model: "gpt-4o",
    });
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
    let messages = threadMessages.data.filter(m => {
      return m.content.length > 0;
    }).map(message => { 
      return {
        role: message.role,
        content: message.content[0].text.value,
        createdAt: message.created_at,
      }
    });
    messages.pop();
    reversed = messages.reverse();
    res.status(200).send(reversed);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
