import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    products: {
      type: Type.ARRAY,
      description: 'An array of products found in the catalog that match the user\'s list.',
      items: {
        type: Type.OBJECT,
        properties: {
          productId: {
            type: Type.NUMBER,
            description: 'The unique ID of the matched product from the catalog.'
          }
        },
        required: ['productId']
      }
    }
  }
};


export async function findProductsInCatalog(userList: string, productCatalog: Product[]): Promise<number[]> {
  if (!userList.trim()) {
    return [];
  }

  const simplifiedCatalog = productCatalog.map(({ id, name, description, category }) => ({
    id,
    name,
    description,
    category
  }));

  const prompt = `
    You are an intelligent shopping assistant for a market called 'Real Preço'.
    Your task is to analyze a user's shopping list text and find the corresponding products from the provided JSON product catalog.
    Only return products that are a confident match from the catalog. Ignore any items from the user's list that you cannot find.
    For example, if the user asks for "pão de forma", and the catalog only has "Pão Francês", do not return a match unless you are very certain.
    If the user mentions a quantity like "1kg de maçã", find the product "Maçã" but ignore the quantity. Your only job is to find the product ID.

    User's Shopping List:
    "${userList}"

    Product Catalog:
    ${JSON.stringify(simplifiedCatalog)}

    Based on the list and catalog, identify the products to be added to the cart.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (parsedJson.products && Array.isArray(parsedJson.products)) {
        return parsedJson.products.map((p: { productId: number }) => p.productId).filter(id => typeof id === 'number');
    }

    return [];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return [];
  }
}