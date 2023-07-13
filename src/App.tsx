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
      'fixed top-5 w-30 left-0 right-0 mx-auto rounded-full flex items-center gap-2 px-3 py-2 transition-colors duration-500')}>
      <div className="font-mono">Theme </div>
      <button type="button"
        onClick={() => { setDark(!dark) }}
        className={clsx(
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
