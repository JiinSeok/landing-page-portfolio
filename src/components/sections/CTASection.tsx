'use client'

import { Button } from '@/components/ui/Button/Button'
import { useModal } from '@/lib/hooks/useModal'
import { useTranslations } from '@/lib/constants/mock-translations'
import styles from '@/lib/utils/styles'

/**
 * CTA (Call to Action) section component for the homepage
 *
 * This component displays a call-to-action section with a title, description,
 * and a button to contact the developer.
 */
export default function CTASection() {
  const t = useTranslations('HomePage')
  const { openModal } = useModal()

  return (
    <section id="contact" className={styles.combineStyles(['w-full bg-primary text-white', styles.layout.section('lg')])}>
      <div className={styles.combineStyles([styles.layout.container('xl'), styles.spacing.paddingX('md'), 'text-center'])}>
        <h2 className={styles.combineStyles([styles.text.heading(2), styles.spacing.marginBottom('sm')])}>{t('cta.title')}</h2>
        <p className={styles.combineStyles([
          styles.text.body('large'), 
          'opacity-90 max-w-2xl mx-auto', 
          styles.spacing.marginBottom('md')
        ])}>
          {t('cta.description')}
        </p>
        <Button 
          variant="default" 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90"
          onClick={() => openModal('contactDialog')}
        >
          {t('cta.button')}
        </Button>
        <p className={styles.combineStyles([
          styles.spacing.marginTop('sm'),
          styles.text.ui('small'),
          'opacity-80'
        ])}>
          {t('cta.contact-info')}
        </p>
      </div>
    </section>
  )
}
