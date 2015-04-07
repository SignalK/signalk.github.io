/*
 * Halcyonic by HTML5 UP
 * html5up.net | @n33co
 * Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

function init(base) {
  skel.init({
    reset: 'full',
    breakpoints: {
      'global': { range: '*', href: base + '/css/style.css' },
      'desktop':{ range: '737-', href: base + '/css/style-desktop.css', containers: 1200, grid: { gutters: 25 } },
      '1000px': { range: '737-1200', href: base + '/css/style-1000px.css', containers: 1000, grid: { gutters: 20 }, viewport: { width: 1080 } },
      'mobile': { range: '-736', href: base + '/css/style-mobile.css', containers: '100%!', grid: { collapse: true, gutters: 20 }, viewport: { scalable: false } }
    },
    plugins: {
      layers: {
        config: {
          mode: 'transform'
        },
        navPanel: {
          hidden: true,
          breakpoints: 'mobile',
          position: 'top-left',
          side: 'left',
          animation: 'pushX',
          width: '80%',
          height: '100%',
          clickToHide: true,
          html: '<div data-action="navList" data-args="nav"></div>',
          orientation: 'vertical'
        },
        titleBar: {
          breakpoints: 'mobile',
          position: 'top-left',
          side: 'top',
          height: 44,
          width: '100%',
          html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span><span class="title" data-action="copyHTML" data-args="logo"></span>'
        }
      }
    }
  });
}
