import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import clsx from 'clsx'
import { AmbienceScene } from './components/AmbienceScene'

export function App() {
  const [dark, setDark] = useState(false)
  return <>
    <div
      aria-hidden="true"
      className={[
        'w-screen h-screen fixed top-0 left-0 z-0 transition-colors duration-500',
        !dark ? 'bg-white ease-in' : 'bg-#2a2b2d ease-out',
      ].join(' ')}
    >
      <Canvas
        shadows
        camera={{ fov: 45, position: [-20, 20, -30] }}
        style={{ pointerEvents: 'none' }}
      >
        <AmbienceScene dark={dark} />
      </Canvas>
    </div>

    <nav className={clsx(
      'bg-neutral/40', dark ? 'text-neutral-300' : 'text-neutral-600',
      'grid grid-cols-5 items-center justify-items-center',
      'fixed top-5 w-48 left-0 right-0 mx-auto rounded-full px-4 py-2 transition-colors duration-500')}>

      <a href="https://github.com/enpitsuLin/ambience-theme" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"></path></svg>
      </a>
      <div className="font-mono col-span-2">Theme </div>
      <button type="button"
        onClick={() => { setDark(!dark) }}
        className={clsx(
          'col-span-2',
          dark ? 'bg-neutral-600' : 'bg-neutral-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500',
        )}
        role="switch"
        aria-checked={dark ? 'true' : 'false'}
      >
        <span className="sr-only">Theme toggle</span>
        <span
          className={clsx(
            dark ? 'translate-x-5 bg-neutral-800' : 'translate-x-0 bg-white',
            'pointer-events-none relative inline-block h-5 w-5 rounded-full ',
            ' shadow transform ring-0 transition ease-in-out duration-200',
          )}
        >
          <span
            className={clsx(
              dark ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity')}
            aria-hidden="true"
          >
            <svg className="h-3 w-3 text-#d97706" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93ZM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121Zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121ZM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"></path></svg>
          </span>

          <span
            className={clsx(
              dark ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg className="h-3 w-3 text-#3b82f6" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.66 9.38-9.98Z"></path></svg>
          </span>
        </span>
      </button>

    </nav>
  </>
}
