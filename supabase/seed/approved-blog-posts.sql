-- Approved launch content. Existing client edits are never overwritten.
begin;
insert into public.blog_posts (title, slug, excerpt, content, story_date, status)
values ('Your future matters', 'your-future-matters-july-2026', 'A thank-you from Abundance Kitchen to the volunteers, donors, and supporters helping children begin the school year with dignity and hope.', 'There is nothing more beautiful than seeing a child walk into school with confidence because someone they have never met chose to care.

As another school year begins, I want to pause and say thank you.

Last year, we hoped to bless around 1,000 children with school uniforms, clothing, stationery, and a few gifts to encourage them. We had no idea what God and the generosity of so many people had in store.

This year, with your help, we were able to bless over 2,000 children.

Behind every backpack, notebook, new dress, and pair of shoes is someone who chose kindness. Someone who believes every child deserves to start the school year with dignity, hope, and the confidence to dream.

We also began supporting three schools in economically challenged communities. We want this to be the beginning of ongoing support, rather than a one-time act of giving.

Abundance Kitchen remains 100% volunteer-driven. From collecting supplies and packing them to reaching the children, this work depends on people who give their time and care. To every volunteer, donor, and supporter: thank you. The smiles on these children’s faces are because of you.

As we spent time with these communities, one concern stayed with us. Too many children leave school between the 8th and 10th grades, often because life leaves them with no other choice.

We want to help these children stay in school, learn vocational skills, and gain the confidence to build a future. Even helping one child can make a difference for generations of their family.

Thank you for caring about these children and for being part of this work.

Together, we’re not just giving school supplies. We’re telling every child, “Your future matters.”', '2026-07-14', 'published')
on conflict (slug) do nothing;

insert into public.blog_posts (title, slug, excerpt, content, story_date, status)
values ('Abundance Kitchen’s work featured on FOX 5 Atlanta', 'abundance-kitchen-fox-5-atlanta-august-2026', 'FOX 5 Atlanta recognizes Alwyn Joseph’s work with Abundance Kitchen.', 'FOX 5 Atlanta featured Alwyn Joseph on August 25, 2026, highlighting his efforts to address food insecurity and his founding of Abundance Kitchen. The station’s report connects his volunteer work with the organization’s support for children in Tamil Nadu, India.

Watch the original FOX 5 Atlanta video to learn more about the recognition and the work behind it.

Source: FOX 5 Atlanta — Atlanta volunteer honored for fighting food insecurity.

https://www.fox5atlanta.com/video/fmc-mx7fc1eh1gmzq35h', '2026-08-25', 'published')
on conflict (slug) do nothing;
commit;
