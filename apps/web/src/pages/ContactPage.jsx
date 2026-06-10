import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch(
        'https://formspree.io/f/xkoazolb',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      toast.success('Message sent!', {
        description: "We'll get back to you soon.",
      });

      form.reset();
    } catch {
      toast.error(
        'Something went wrong. Try emailing eookuro@tekkerz.co directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">

      <Helmet>
        <title>Contact Us | Chicago Super League</title>

        <meta
          name="description"
          content="Get in touch with the Chicago Super League team — questions about joining, sponsorships, or anything else."
        />

        <link
          rel="canonical"
          href="https://chicagosuperleague.com/contact"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
            WE'RE HERE TO HELP
          </span>

          <h1 className="text-[hsl(var(--black))] text-6xl md:text-7xl mb-6">
            GET IN TOUCH
          </h1>

          <p className="text-[hsl(var(--gray))] text-xl max-w-2xl mx-auto">
            Questions about joining, sponsorships, partnerships,
            or anything else — reach out.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-8"
          >

            <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl shadow-sm border border-[hsl(var(--white))]">

              <h3 className="text-3xl text-[hsl(var(--black))] mb-6">
                Contact Info
              </h3>

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-[hsl(var(--light-bg))] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[hsl(var(--black))] mb-1">
                    Location
                  </h4>

                  <p className="text-[hsl(var(--gray))]">
                    Chicago, IL — South Side
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >

            <div className="bg-[hsl(var(--true-white))] p-8 md:p-10 rounded-2xl shadow-sm border border-[hsl(var(--white))]">

              <h3 className="text-3xl text-[hsl(var(--black))] mb-8">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-[hsl(var(--black))] font-bold"
                    >
                      Full Name
                    </Label>

                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      className="bg-[hsl(var(--light-bg))] border-transparent focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] text-[hsl(var(--black))]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[hsl(var(--black))] font-bold"
                    >
                      Email Address
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="bg-[hsl(var(--light-bg))] border-transparent focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] text-[hsl(var(--black))]"
                    />
                  </div>

                </div>

                <div className="space-y-2">

                  <Label
                    htmlFor="subject"
                    className="text-[hsl(var(--black))] font-bold"
                  >
                    Subject
                  </Label>

                  <Input
                    id="subject"
                    required
                    placeholder="How can we help?"
                    className="bg-[hsl(var(--light-bg))] border-transparent focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] text-[hsl(var(--black))]"
                  />

                </div>

                <div className="space-y-2">

                  <Label
                    htmlFor="message"
                    className="text-[hsl(var(--black))] font-bold"
                  >
                    Message
                  </Label>

                  <Textarea
                    id="message"
                    required
                    placeholder="Write your message here..."
                    className="min-h-[150px] bg-[hsl(var(--light-bg))] border-transparent focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] text-[hsl(var(--black))]"
                  />

                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg py-6 h-auto"
                >

                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}

                </Button>

              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;