import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import LaunchDetails from '../../components/LaunchDetails';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const Launch = () => {
  const [launch, setLaunch] = useState("");
  const [title, setTitle] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

  useEffect(() => {
    const launchId = router.query.id;
    if (launchId && launchId !== 'new') {
      setTitle(`SpaceX Launch #${launchId}`);
      getLaunch(launchId);
    }
  }, [router.query.id])

  const getLaunch = async (launchID) => {
    setLoading(true);
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
        setLoading(false);
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
        {loading && <Spin indicator={antIcon} />}
        {!loading && <LaunchDetails data={launch} />}
      </main>
    </div>
  );
}

export default Launch;