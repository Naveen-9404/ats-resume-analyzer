import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Final Year CSE Student",
    rating: 5,
    quote:
      "VectorCV helped me understand why my resume wasn't getting shortlisted. The ATS score and AI recommendations made my resume much stronger.",
  },
  {
    name: "Priya Reddy",
    role: "Frontend Developer",
    rating: 5,
    quote:
      "The recruiter verdict and executive summary were incredibly useful. I improved my resume in less than an hour.",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    rating: 5,
    quote:
      "The PDF report looks professional and the AI suggestions are practical. It feels like having a personal resume coach.",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-600">
            User Feedback
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
            Loved by Students
            <br />
            and Professionals
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            See how VectorCV helps job seekers build
            ATS-friendly resumes with confidence.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                delay: index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
            >
              <Quote
                size={34}
                className="text-emerald-500"
              />

              <div className="mt-5 flex gap-1">
                {Array.from({
                  length: item.rating,
                }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-slate-600">
                "{item.quote}"
              </p>

              <div className="mt-8 border-t border-slate-100 pt-5">
                <h3 className="font-bold text-slate-900">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}

        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Testimonials shown are representative examples for demonstration purposes.
        </p>

      </div>
    </section>
  );
}

export default Testimonials;