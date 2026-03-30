import { NextResponse } from 'next/server';
import { getAnichinData, getNimegamiData } from '@/lib/scraper';

export async function GET() {
  try {
    const [anichin, nimegami] = await Promise.all([
      getAnichinData(),
      getNimegamiData()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        popular: [...anichin.popular, ...nimegami.popular],
        latestDonghua: anichin.latest,
        latestAnime: nimegami.latest
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}
