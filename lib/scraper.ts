import * as cheerio from 'cheerio';

export async function getAnichinData() {
  try {
    const res = await fetch('https://anichin.cafe/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://anichin.cafe/'
      },
      next: { revalidate: 3600 }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const popular: any[] = [];
    const latest: any[] = [];

    $('.swiper-slide.item').each((_, el) => {
      const style = $(el).attr('style') || '';
      const bgMatch = style.match(/background-image:\s*url\('([^']+)'\)/);
      const img = bgMatch ? bgMatch[1] : '';
      const link = $(el).find('a').attr('href') || '';
      const title = $(el).find('a').attr('data-jtitle') || '';

      if (title && link) {
        popular.push({ title, link, img, source: 'anichin', type: 'Donghua' });
      }
    });

    $('.releases.latesthome article.bs').each((_, el) => {
      const link = $(el).find('a').attr('href') || '';
      const img = $(el).find('img').attr('src') || '';
      const ep = $(el).find('.epx').text().trim();
      let title = $(el).find('.tt h2').text().trim();
      if (!title) title = $(el).find('h2[itemprop="headline"]').text().trim();

      title = title.replace(/Episode\s+\d+.*$/i, '').trim();
      const is_completed = ep.toLowerCase().includes('end') || ep.toLowerCase().includes('tamat');

      if (title && link) {
        latest.push({ title, ep, link, img, source: 'anichin', type: 'Donghua', is_completed });
      }
    });

    return { popular, latest };
  } catch (error) {
    console.error('Anichin scrape error:', error);
    return { popular: [], latest: [] };
  }
}

export async function getNimegamiData() {
  try {
    const res = await fetch('https://nimegami.id/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 3600 }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const popular: any[] = [];
    const latest: any[] = [];

    $('.wrapper-2-a article').each((_, el) => {
      const title = $(el).find('.title-post2').text().trim();
      const link = $(el).find('a').first().attr('href') || '';
      let img = $(el).find('.thumb img').attr('src') || '';
      img = img.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, '');

      if (title && link) {
        popular.push({ title, link, img, source: 'nimegami', type: 'Anime' });
      }
    });

    $('.post-article article').each((_, el) => {
      const title = $(el).find('h2[itemprop="name"] a').text().trim();
      const link = $(el).find('h2[itemprop="name"] a').attr('href') || '';
      let img = $(el).find('.thumb img').attr('src') || '';
      img = img.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, '');

      let ep = '? Eps';
      $(el).find('ul li').each((_, li) => {
        const text = $(li).text();
        if (text.toLowerCase().includes('episode:')) {
          ep = text.replace(/Episode:/i, '').trim() + ' Eps';
        }
      });

      let is_completed = false;
      $(el).find('.bot-post a').each((_, a) => {
        const badge = $(a).text().trim();
        if (['Complete', 'Batch', 'BD'].includes(badge)) {
          is_completed = true;
          ep = 'Tamat';
        }
      });

      if (title && link) {
        latest.push({ title, link, img, ep, is_completed, source: 'nimegami', type: 'Anime' });
      }
    });

    return { popular, latest };
  } catch (error) {
    console.error('Nimegami scrape error:', error);
    return { popular: [], latest: [] };
  }
}
