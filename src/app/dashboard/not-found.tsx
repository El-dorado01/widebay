'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardNotFound() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 p-6 text-center h-full min-h-[85vh] overflow-hidden relative'>
      {/* Background Decorative Elements */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-2xl aspect-square bg-accent/5 rounded-full blur-3xl' />
      <div className='absolute top-1/4 left-1/4 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center max-w-lg w-full'
      >
        <div className='relative mb-6 mt-6'>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='relative z-10'
          >
            <div className='bg-sidebar border-2 border-accent/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group'>
              <div className='absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <Ghost className='size-18 text-accent mx-auto' />
              <h1 className='text-7xl font-black text-accent mt-2 tracking-tighter'>
                404
              </h1>
            </div>
          </motion.div>

          {/* Shadow element */}
          <motion.div
            animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className='w-32 h-4 bg-black/10 blur-md rounded-full mx-auto mt-4'
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold tracking-tight mb-3'>
            Lost in the Sky?
          </h2>
          <p className='text-muted-foreground text-lg mb-10 leading-relaxed'>
            We couldn't find the flight path you're looking for.{' '}
            <br className='hidden sm:block' />
            Don't worry, even the best pilots get off course sometimes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='flex flex-col sm:flex-row items-center gap-4 w-full'
        >
          <Button
            asChild
            variant='outline'
            className='w-full sm:flex-1 h-14 text-base font-medium border-2 hover:bg-primary/80 transition-all rounded-2xl group'
          >
            <Link href='/dashboard'>
              <ArrowLeft className='mr-2 size-5 group-hover:-translate-x-1 transition-transform' />
              Retrace Steps
            </Link>
          </Button>

          <Button
            asChild
            className='w-full sm:flex-1 h-14 text-base font-medium bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all rounded-2xl'
          >
            <Link href='/dashboard'>
              <Home className='mr-2 size-5' />
              Mission Control
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='mt-12 flex items-center gap-2 text-sm text-muted-foreground italic'
        >
          <Search className='size-4' />
          <span>Try searching for products above instead</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
