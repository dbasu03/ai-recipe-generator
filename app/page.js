'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [ingredients, setIngredients] = useState('')
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients')
      return
    }

    setLoading(true)
    setError('')
    setRecipe('')

    try {
      const response = await axios.post('/api/generate-recipe', {
        ingredients: ingredients.trim()
      })
      
      setRecipe(response.data.recipe)
    } catch (err) {
      console.error('Error generating recipe:', err)
      setError(err.response?.data?.error || 'Failed to generate recipe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateRecipe()
    }
  }

  return (
    <div className="container">
      <div className="recipe-generator">
        <h1 className="title">🍳 AI Recipe Generator</h1>
        <p className="subtitle">
          Enter your available ingredients and let AI create a delicious recipe for you!
        </p>

        <div className="example">
          <strong>Example:</strong> chicken breast, rice, bell peppers, garlic, olive oil
        </div>

        <div className="form-group">
          <label htmlFor="ingredients" className="label">
            Available Ingredients (separated by commas):
          </label>
          <textarea
            id="ingredients"
            className="textarea"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., chicken, rice, vegetables, spices..."
            disabled={loading}
          />
        </div>

        <button
          className="button"
          onClick={generateRecipe}
          disabled={loading || !ingredients.trim()}
        >
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Generating your recipe...
            </div>
          ) : (
            'Generate Recipe'
          )}
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {recipe && (
          <div className="recipe-output">
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Your AI-Generated Recipe:</h3>
            {recipe}
          </div>
        )}
      </div>
    </div>
  )
}
