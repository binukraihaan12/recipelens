import { GoogleGenerativeAI } from "@google/generative-ai";
import { Recipe } from "@/pages/Index";
import { supabase } from "@/integrations/supabase/client";

let geminiApi: GoogleGenerativeAI | null = null;

export const initGemini = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'GEMINI_API_KEY' }
    });
    
    if (error) throw error;
    if (!data?.secret) throw new Error('GEMINI_API_KEY not found');
    
    geminiApi = new GoogleGenerativeAI(data.secret);
    console.log('Gemini API initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Gemini API:', error);
    throw error;
  }
};

export const analyzeImage = async (imageData: string): Promise<Recipe[]> => {
  if (!geminiApi) {
    await initGemini();
    if (!geminiApi) {
      throw new Error("Gemini API not initialized");
    }
  }

  // Remove the data:image/[type];base64, prefix
  const base64Image = imageData.split(',')[1];

  const model = geminiApi.getGenerativeModel({ model: "gemini-1.5-flash" });

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