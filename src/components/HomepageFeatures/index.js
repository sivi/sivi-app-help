import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: '1. Ease of Use',
    description: <>Sivi API and SDK are simple to start generating designs within your workflows.</>,
  },
  {
    title: '2. Customizable designs',
    description: <>Sivi generates multi-layered vector designs for your marketing and business use cases.</>,
  },
  {
    title: '3. Prompt to designs',
    description: <>Generate designs using natural language prompts that describe your design needs.</>,
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
