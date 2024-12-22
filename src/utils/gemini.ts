import { GoogleGenerativeAI } from "@google/generative-ai";

let geminiApi: GoogleGenerativeAI | null = null;

export const initGemini = (apiKey: string) => {
  geminiApi = new GoogleGenerativeAI(apiKey);
};

export const analyzeImage = async (imageData: string): Promise<Recipe[]> => {
  if (!geminiApi) {
    throw new Error("Gemini API not initialized");
  }

  // Remove the data:image/[type];base64, prefix
  const base64Image = imageData.split(',')[1];

  const model = geminiApi.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = `Analyze this image of ingredients and suggest recipes that can be made using them. 
  For each recipe, provide:
  - A title
  - A list of ingredients with quantities
  - Step-by-step instructions
  - Estimated cooking time
  - Number of servings
  Format the response as a JSON array of recipes.
  Each recipe should have: title, ingredients (array), instructions (array), cookingTime (string), servings (number), and imageUrl (use a placeholder for now).`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Log the raw response for debugging
    console.log('Gemini API Response:', text);

    try {
      // Try to parse the response as JSON
      const recipes = JSON.parse(text);
      return recipes.map((recipe: any) => ({
        ...recipe,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" // Placeholder image
      }));
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      throw new Error('Failed to parse recipe suggestions');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};