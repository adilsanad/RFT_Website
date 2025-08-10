'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './ui/button'

interface ProjectInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function ProjectInquiryModal({ isOpen, onClose, title = "Work with Rainfield Techno" }: ProjectInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectDetails: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        subject: `Project Inquiry: ${title}`,
        inquiryType: 'project',
        customerInfo: formData,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', company: '', email: '', phone: '', projectDetails: '', location: '' });
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-manrope"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-white rounded-[30px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="tracking-tighter flex flex-col gap-1 mb-3">
              <div className="flex justify-between items-center">
                <p className="text-black/60 font-medium text-lg font-neulissans">Project Inquiry</p>
                <button
                  onClick={onClose}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <h4 className="font-neulisneue text-2xl">{title}</h4>
            </div>
            <p className="text-black/60 font-medium tracking-tight mb-6">
              Fill out the form below and we'll get back to you to discuss your project requirements.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                Project inquiry sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                Failed to send project inquiry. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium font-neulisneue mb-1">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium font-neulisneue mb-1">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-neulisneue mb-1">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium font-neulisneue mb-1">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium font-neulisneue mb-1">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g., Nashik, Maharashtra"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium font-neulisneue mb-1">Requirement Details *</label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Please describe your project/product requirements, scope, timeline, and any specific needs..."
                  rows={5}
                  required
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}