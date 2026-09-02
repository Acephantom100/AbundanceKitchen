import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Privacy() {
  return <><Header /><main id="main-content" className="site-container reading-page"><p className="eyebrow">Your information</p><h1>Privacy, in plain language.</h1><div className="reading-copy">
    <h2>Reading the website</h2><p>The website is hosted on Vercel. Hosting providers may process connection information, such as IP addresses and request logs, to deliver and protect the service. Fonts are loaded from Google Fonts; your browser connects to Google when downloading them.</p>
    <h2>Getting in touch or donating</h2><p>Email and phone links open your own email or phone application. Information you send is received by the team through those services. Bank transfers take place outside this website. This site does not collect bank passwords, card numbers, or one-time codes.</p>
    <h2>Blog editors and photos</h2><p>The editor uses Supabase for authentication, blog content, and image storage. It stores a sign-in session in your browser so you can stay signed in. Only approved editors may change posts. Draft stories and their photos are restricted to approved editors. When a story is published, visitors can read it and view its cover photo. Unpublishing stops new visitor access, but cannot recall copies someone has already downloaded.</p><p>Replacing or removing a cover photo and saving the story also deletes its old stored file when no other story uses it. Failed deletions are reported to the editor for follow-up. Only upload photographs you have permission to publish, with particular care for children’s privacy.</p>
    <h2>Questions or requests</h2><p>Contact <a href="mailto:alwynjosephp@gmail.com">alwynjosephp@gmail.com</a> with questions about information you have shared with the organization, or to request a correction or removal.</p>
  </div></main><Footer /></>;
}
