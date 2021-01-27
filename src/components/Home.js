import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">CC2021 Summer Assignment 2: The website is a prototype of cloud storage solution.</span>
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
