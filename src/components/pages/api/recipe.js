export default async function handler(req, res) {
  const { searchTerm } = req.query;
  const query = searchTerm || 'chicken';

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}