import React from 'react';
import { motion } from 'framer-motion';
import { ServerStatusCard } from './components/server/ServerStatusCard';
import { OnlineUsersCard } from './components/server/OnlineUsersCard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ContactCard } from './components/info/ContactCard';
import { WelcomeCard } from './components/info/WelcomeCard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-green/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WelcomeCard />
          </motion.div>
          <motion.div
            id="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ServerStatusCard />
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            <motion.div
              id="users"
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <OnlineUsersCard />
            </motion.div>
            <motion.div
              id="contact"
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ContactCard className="flex-grow" />
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;