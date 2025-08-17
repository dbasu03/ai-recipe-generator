import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request) {
  try {
    // Parse the request body
    const { ingredients } = await request.json()

    // Validate input
    if (!ingredients || typeof ingredients !== 'string' || ingredients.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Please provide valid ingredients' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set')
      return new Response(JSON.stringify({ error: 'API configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Use the correct model name - this is the fix!
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Create prompt
    const prompt = `Create a delicious recipe using these ingredients: ${ingredients.trim()}

Please include:
1. Recipe name
2. Ingredients list with quantities
3. Step-by-step cooking instructions
4. Cooking time and servings
5. Any helpful tips

Make the recipe practical and easy to follow.`

    try {
      // Generate content using Gemini
      const result = await model.generateContent(prompt)
      const response = await result.response
      const recipe = response.text()

      // Check if we got a good response
      if (!recipe || recipe.length < 50) {
        // Fallback recipe
        const fallbackRecipe = `# Simple ${ingredients} Recipe

## Ingredients:
- ${ingredients}
- 2 tablespoons cooking oil
- Salt and pepper to taste
- Optional seasonings (garlic, herbs, spices)

## Instructions:
1. Prepare your ${ingredients} by washing and chopping as needed
2. Heat oil in a large pan over medium heat
3. Add your prepared ingredients to the pan
4. Cook for 8-12 minutes, stirring occasionally
5. Season with salt and pepper
6. Taste and adjust seasoning as needed
7. Serve hot and enjoy!

**Cooking Time:** 15-20 minutes  
**Servings:** 2-4 people

**Tips:** Feel free to add your favorite herbs or spices to enhance the flavor!`

        return new Response(JSON.stringify({ recipe: fallbackRecipe }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify({ recipe }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })

    } catch (geminiError) {
      console.error('Gemini API error:', geminiError)
      
      // Handle specific errors
      if (geminiError.message?.includes('API_KEY_INVALID')) {
        return new Response(JSON.stringify({ error: 'Invalid API key' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      if (geminiError.message?.includes('QUOTA_EXCEEDED')) {
        return new Response(JSON.stringify({ error: 'API quota exceeded' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      // Return a fallback recipe instead of an error
      const fallbackRecipe = `# ${ingredients} Recipe

## Ingredients:
- ${ingredients}
- Basic cooking ingredients (oil, salt, pepper)

## Instructions:
1. Prepare your ingredients
2. Cook according to your preferred method
3. Season to taste
4. Serve and enjoy!

*Note: This is a basic recipe template. The AI service is temporarily unavailable.*`

      return new Response(JSON.stringify({ 
        recipe: fallbackRecipe,
        note: 'Using fallback recipe due to AI service issue'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Error in generate-recipe API:', error)
    
    // Always return a working recipe
    return new Response(JSON.stringify({
      recipe: `# Quick Recipe

## Ingredients:
- Your ingredients
- Cooking oil
- Salt and pepper

## Instructions:
1. Prepare ingredients
2. Cook in a pan with oil
3. Season with salt and pepper
4. Serve hot

*Basic fallback recipe*`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}