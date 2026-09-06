import { profile } from '@/data/profile';
export function Footer() {
  return (
    <footer className="site-footer shell">
      <p>© {new Date().getFullYear()} Wahyu Mahendra</p>
      <span className="footer-note">Built with care. Always curious.</span>
      <div>
        <a href={profile.github}>GitHub ↗</a>
        <a href={profile.linkedin}>LinkedIn ↗</a>
        <a href={`mailto:${profile.email}`}>Email ↗</a>
      </div>
    </footer>
  );
}
