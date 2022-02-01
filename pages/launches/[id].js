import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';

const launchDetails =()=>{
    const [launch, setLaunch]=useState("");
    const router=useRouter();

    useEffect(() => {
        const launchId = router.query.id;
        if (launchId !== 'new') {
            getLaunch(launchId);
        }
      }, [router.query.id])

    const getLaunch= async (launchID)=> {
        const client = new ApolloClient({
          uri: 'https://api.spacex.land/graphql/',
          cache: new InMemoryCache()
        });

        try{
        const {data}= await client.query({
            query:gql`
            query getLaunch($id: ID!) {
                launch(id: $id) {
                  id
                  details
                  rocket {
                    rocket_name
                    rocket_type
                  }
                  links {
                    article_link
                    flickr_images
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
      
        if(data.launch){
            setLaunch(JSON.stringify(data.launch))
        }
        } catch (e) {
        // catch any errors from Apollo Error.
        console.log(e);
      }
 
    }

    return(
        <div>
          <Head>
            <title>SpaceX Land</title>
            <meta name="description" content="SpaceX Launches" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h2>hi</h2>
            <p>{launch}</p>
          </main>
        </div>
    );
}

export default launchDetails;