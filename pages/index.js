import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({launches, error}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Land</title>
        <meta name="description" content="Recent SpaceX Launches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://api.spacex.land/graphql/">SpaceX Land!</a>
        </h1>
{/* 
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div className={styles.grid}>
        {launches.map(launch => 
            <Link key={launch.id} href={"/launches/"+launch.id}>
              <div className={styles.card}>
                <h3>{ launch.mission_name }</h3>
                <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
              </div>
            </Link>)}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  try{
    const { data } = await client.query({
      query: gql`
        query GetLaunches {
          launchesPast(limit: 20, sort: "") {
            mission_name
            launch_date_local
            id
          }
        }`
    });

    return {
      props: {
        launches: data.launchesPast,
        error: false
      }
    }
    
  }catch(e){
    return {
      props: {
        launches: [],
        error: true
      }
    }
  }
}