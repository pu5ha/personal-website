import { getAllPosts } from '@/lib/blog';
import HomeClient from './HomeClient';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${month}/${day}/${year}`;
}

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3).map((post) => ({
    title: post.title,
    date: formatDate(post.date),
    slug: post.slug,
  }));

  return <HomeClient recentPosts={recentPosts} />;
}
