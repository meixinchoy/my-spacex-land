import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import LaunchDetails from '../../components/LaunchDetails';

const launch = () => {
  const [launch, setLaunch] = useState("");
  const [title, setTitle] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    const launchId = router.query.id;
    if (launchId && launchId !== 'new') {
      setTitle(`SpaceX Launch #${launchId}`);
      getLaunch(launchId);
    }
  }, [router.query.id])

  const getLaunch = async (launchID) => {
    const client = new ApolloClient({
      uri: 'https://api.spacex.land/graphql/',
      cache: new InMemoryCache()
    });

    try {
      const { data } = await client.query({
        query: gql`
            query getLaunch($id: ID!) {
                launch(id: $id) {
                  id
                  mission_name
                  details
                  rocket {
                    rocket_name
                    rocket_type
                  }
                  links {
                    reddit_media
                    video_link
                    flickr_images
                    article_link
                    mission_patch
                    mission_patch_small
                    presskit
                    reddit_campaign
                    reddit_launch
                    reddit_recovery
                    wikipedia
                  }
                  launch_date_local
                  launch_success
                  launch_site {
                    site_name
                    site_id
                  }
                }
              }`,
        variables: { "id": launchID },
        fetchPolicy: 'no-cache'

      })

      if (data.launch) {
        setLaunch(JSON.stringify(data.launch))
      }
    } catch (e) {
      // catch any errors from Apollo Error.
      console.log(e);
    }

  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="SpaceX Launches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LaunchDetails data={launch} />
      </main>
    </div>
  );
}

export default launch;