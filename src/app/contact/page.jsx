import { MailIcon, PhoneIcon } from "@/assets/icons";
import BreadCrumb from "@/components/BreadCrumb";

export default function Contact() {
  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="Contact" />

        {/* Contact container */}
        <div className="gap-8 space-y-8 md:flex md:space-y-0">
          {/* item 1 */}
          <div className="product-shadow space-y-8 px-8  py-10 lg:max-w-sm">
            {/* call to us */}
            <div className="space-y-6">
              {/* heading */}
              <div className="flex items-center gap-4">
                {/* icon container */}
                <div className="rounded-full bg-button2 p-2 text-2xl text-text">
                  <PhoneIcon />
                </div>
                <p className="font-medium">Call To Us</p>
              </div>
              {/* content */}
              <div className="space-y-4">
                <p className="text-sm">We are available 24/7, 7 days a week.</p>
                <p className="text-sm">Phone: +8801611112222</p>
              </div>
            </div>

            {/* horizontal line */}
            <hr className="w-full border border-black/50" />

            {/* Write to us */}
            <div className="space-y-6">
              {/* heading */}
              <div className="flex items-center gap-4">
                {/* icon container */}
                <div className="rounded-full bg-button2 p-2 text-2xl text-text">
                  <MailIcon />
                </div>
                <p className="font-medium">Write To Us</p>
              </div>
              {/* content */}
              <div className="space-y-4">
                <p className="text-sm">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-sm">Emails: customer@xclusive.com</p>
                <p className="text-sm">Emails: support@xclusive.com</p>
              </div>
            </div>
          </div>

          {/* item 2 */}
          <form className="product-shadow space-y-8 px-8 py-10 md:w-[calc(50%-2rem)] lg:w-auto">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="rounded bg-secondary px-4 py-3 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="rounded bg-secondary px-4 py-3 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Your Phone"
                className="rounded bg-secondary px-4 py-3 focus:outline-none"
                required
              />
            </div>

            <textarea
              name="message"
              className="h-52 w-full rounded bg-secondary px-4 py-3 focus:outline-none"
              required
              placeholder="Your message *"
            />

            <button className="btn2 w-full max-w-none lg:ml-auto lg:max-w-max">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
