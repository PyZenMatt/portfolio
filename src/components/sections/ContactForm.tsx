import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import { useToast } from '../../hooks/useToast'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staggerContainer, staggerChild } from '../../motion'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const { showToast } = useToast()
  const prefersReducedMotion = useReducedMotion()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Mock API call - will be replaced with Django backend in Issue #12
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log('Form data:', data)
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success')
      reset()
    } catch {
      showToast('Failed to send message. Please try again.', 'error')
    }
  }

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div
  const MotionForm = prefersReducedMotion ? 'form' : motion.form

  return (
    <MotionForm
      {...(!prefersReducedMotion && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: staggerContainer,
      })}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      {/* Name Field */}
      <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
        >
          Name *
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          isInvalid={!!errors.name}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </MotionDiv>

      {/* Email Field */}
      <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
        >
          Email *
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          isInvalid={!!errors.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </MotionDiv>

      {/* Message Field */}
      <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
        >
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or idea..."
          rows={6}
          isInvalid={!!errors.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
          })}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.message.message}
          </p>
        )}
      </MotionDiv>

      {/* Submit Button with micro-spring */}
      <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
            {/* Ripple effect layer */}
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-out" />
          </Button>
        </motion.div>
      </MotionDiv>

      <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
        <p className="text-sm text-[var(--color-text-secondary)] text-center">
          * Required fields
        </p>
      </MotionDiv>
    </MotionForm>
  )
}
