import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'

export default function Home({ launches, error }) {
  return (
    <div className="homeContainer">
      <Head>
        <title>SpaceX Land</title>
        <meta name="description" content="Recent SpaceX Launches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title size-64">
          Welcome to <a href="https://api.spacex.land/graphql/" target="_blank" rel="noreferrer">SpaceX Land!</a>
        </h1>

        <p className="description size-24">
          Check out our 20 most recent launches:
        </p>

        <div className="grid">
          {launches.map(launch =>
            <Link key={launch.id} href={"/launches/" + launch.id} >
              <div className={"card" + " link"}>
                <h3>{launch.mission_name}</h3>
                <p className="size-18"><strong>Launch Date:</strong> {new Date(launch.launch_date_local).toLocaleDateString("en-US")}</p>
              </div>
            </Link>)}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  try {
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

  } catch (e) {
    return {
      props: {
        launches: [],
        error: true
      }
    }
  }
}