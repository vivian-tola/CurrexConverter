import React, { useState, useEffect } from "react";
import { getCurrencyRates } from "../services/currencyServices";
import { useTheme } from '../Hooks/useTheme';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rates = await getCurrencyRates();

        // Create blog posts from rates
        const currentDate = new Date();
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);

        const twoDaysAgo = new Date(currentDate);
        twoDaysAgo.setDate(currentDate.getDate() - 2);

        const blogPosts = [
          {
            id: 1,
            date: currentDate.toLocaleDateString(),
            title: "Today's Currency Market Overview",
            excerpt:
              "Dollar strengthens against major currencies as Federal Reserve signals policy shift.",
            content: `
              <p>The US Dollar showed remarkable strength in today's trading session, appreciating against all major currencies. This comes after the Federal Reserve's announcement regarding potential policy adjustments in response to recent economic data.</p>
              <h3>Key Movements:</h3>
              <ul>
                <li>EUR/USD: Down 0.5% to ${
                  rates.EUR ? rates.EUR.toFixed(4) : "0.9150"
                }</li>
                <li>GBP/USD: Down 0.3% to ${
                  rates.GBP ? rates.GBP.toFixed(4) : "0.7825"
                }</li>
                <li>USD/JPY: Up 0.8% to ${
                  rates.JPY ? (1 / rates.JPY).toFixed(2) : "151.20"
                }</li>
              </ul>
              <p>Analysts suggest this trend might continue through the week as markets digest new economic indicators expected to be released tomorrow.</p>
            `,
          },
          {
            id: 2,
            date: yesterday.toLocaleDateString(),
            title: "Euro Weakens Following ECB Comments",
            excerpt:
              "European Central Bank's cautious stance leads to Euro depreciation against basket of currencies.",
            content: `
              <p>The Euro weakened today after European Central Bank officials expressed caution about the region's economic recovery. Comments from key ECB members indicated reluctance to adjust monetary policy in the near term despite rising inflation pressures.</p>
              <h3>Notable Changes:</h3>
              <ul>
                <li>EUR/USD: Down 0.2% to 0.9170</li>
                <li>EUR/GBP: Down 0.4% to 1.1726</li>
                <li>EUR/CHF: Down 0.3% to 0.9643</li>
              </ul>
              <p>Market participants are now closely watching tomorrow's Eurozone PMI data to gauge the region's economic momentum.</p>
            `,
          },
          {
            id: 3,
            date: twoDaysAgo.toLocaleDateString(),
            title: "Asian Currencies Show Mixed Performance",
            excerpt:
              "Japanese Yen strengthens while Chinese Yuan faces pressure amid trade tensions.",
            content: `
              <p>Asian currencies showed mixed performance in today's trading session. The Japanese Yen strengthened significantly against the US Dollar, benefiting from its safe-haven status amid growing global economic uncertainties.</p>
              <h3>Key Asian Currency Movements:</h3>
              <ul>
                <li>USD/JPY: Down 0.7% to 150.35</li>
                <li>USD/CNY: Up 0.4% to 7.3128</li>
                <li>USD/SGD: Up 0.2% to 1.3576</li>
              </ul>
              <p>The Chinese Yuan continues to face pressure as trade tensions persist, while the Singapore Dollar showed relative stability supported by the country's strong economic fundamentals.</p>
            `,
          },
        ];

        setPosts(blogPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200 min-h-screen`}>
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-xl">Loading blog posts...</div>
      </div>
    </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200 min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Currency Market Blog</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Daily updates on foreign exchange markets</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {posts.map(post => (
            <div key={post.id} className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-200`}>
              <div className="p-6">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>{post.date}</div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{post.excerpt}</p>
                <div 
                  className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
