'use client'

import Form from '@/components/ui/input/Form'
import { Button } from '@/components/ui/Button/Button'
import {useTranslations} from '@/lib/providers/TextContext'

/**
 * Newsletter section component for the homepage
 *
 * This component displays a newsletter subscription form to capture user emails.
 */
export default function NewsletterSection() {
  const t = useTranslations('pages.home.sections.release')

  // Handle form submission
  const handleSubmit = (data: any) => {
    // Add newsletter subscription logic here
    console.log('Newsletter subscription submitted', data)
  }

  return (
    <section
      id="newsletter"
      className="w-full py-20 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('description')}
        </p>
        <Form
          formId="newsletter-form"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <Form.Field>
            <Form.Input
              name="email"
              type="text"
              placeholder={t('email-placeholder')}
              className="flex-grow"
              required
              aria-label={t('email-placeholder')}
            />
          </Form.Field>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t('subscribe')}
          </Button>
        </Form>
      </div>
    </section>
  )
}
