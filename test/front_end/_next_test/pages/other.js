import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/layout'
import styles from '../styles/Home.module.css'


export default function Other() {
  return (
    <Layout>
      <Head>
        <title>Other Page</title>
      </Head>

      <h1>Other Page</h1>

      <h2 className={styles.subtitle}>
        Back to{' '}
        <Link href="/">
          <a>Home page</a>
        </Link>
      </h2>

      <Image
        src="/img/SampleJPGImage_1mbmb.jpeg"
        alt="load picture failed..."
        width={200}
        height={200}
      />
    </Layout>
  )
}
