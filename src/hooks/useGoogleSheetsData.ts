import { useState, useEffect } from 'react';

interface SheetData {
  client: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

export function useGoogleSheetsData(csvUrl: string) {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV data
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const parsedData: SheetData[] = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            
            if (values.length >= 5) {
              parsedData.push({
                client: values[0] || 'Unknown',
                headshots: parseInt(values[1]) || 0,
                price: parseFloat(values[2]) || 0,
                status: values[3] || 'pending',
                email: values[4] || 'N/A'
              });
            }
          }
        }
        
        setData(parsedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data from Google Sheets');
        // Fallback demo data
        setData([
          { client: 'Acme Corp', headshots: 25, price: 2500, status: 'completed', email: 'contact@acme.com' },
          { client: 'Tech Startup', headshots: 15, price: 1800, status: 'pending', email: 'hr@techstartup.io' },
          { client: 'Design Studio', headshots: 30, price: 3200, status: 'completed', email: 'team@design.studio' },
          { client: 'Marketing Agency', headshots: 12, price: 1500, status: 'cancelled', email: 'info@marketing.co' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { data, loading, error };
}