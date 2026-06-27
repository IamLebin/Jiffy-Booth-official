const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g8867hcl';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN or SANITY_API_TOKEN.');
  process.exit(1);
}

async function main() {
  const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: 'headerFooter',
            set: {
              'footerSection.footerLinks': [],
            },
          },
        },
      ],
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    console.error('Failed to clear headerFooter.footerLinks');
    console.error(JSON.stringify(body, null, 2));
    process.exit(1);
  }

  console.log('Cleared headerFooter.footerLinks');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});