/**
 * Loads footer component into all pages
 * Usage: Add <div id="footer-container"></div> where you want the footer
 */

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    
    // Only proceed if container exists
    if (!footerContainer) return;
    
    // Show loading state
    footerContainer.innerHTML = `
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    `;
    
    // Fetch footer content
    fetch('/src/components/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        footerContainer.innerHTML = html;
        
        // Ensure main CSS is loaded
        if (!document.querySelector('link[href="/styles/main.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/styles/main.css';
          document.head.appendChild(link);
        }
      })
      .catch(error => {
        console.error('Failed to load footer:', error);
        footerContainer.innerHTML = `
          <div class="bg-red-50 text-red-600 p-4 text-center">
            Footer failed to load. Please refresh the page or contact support.
          </div>
        `;
      });
  }
  
  // Load footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
  
  // Make function available globally if needed
  window.loadFooter = loadFooter;