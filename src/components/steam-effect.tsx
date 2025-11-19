'use client'

import React from 'react'

interface SteamParticle {
    id: number
    left: number
    delay: number
    duration: number
}

export function SteamEffect({ isVisible = true }: { isVisible?: boolean }) {
    const particles: SteamParticle[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 50 - 25,
        delay: Math.random() * 0.3,
        duration: 1.2 + Math.random() * 0.6,
    }))

    return (
        <div
            className={`absolute inset-0 pointer-events-none overflow -z-10`}
            style={{
                transition: 'opacity 300ms ease-in-out',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.8;
          }
          40% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-150px) translateX(var(--tx)) scale(0.3);
            opacity: 0;
          }
        }

        .steam-particle {
          animation: float-up var(--duration) ease-out var(--delay) infinite;
        }
      `}</style>

            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="steam-particle absolute w-6 h-6 rounded-full blur-lg pointer-events-none"
                    style={
                        {
                            left: `calc(50% + ${particle.left}px)`,
                            top: '50%',
                            '--duration': `${particle.duration}s`,
                            '--delay': `${particle.delay}s`,
                            '--tx': `${particle.left * 1.2}px`,
                            background: `#FFFFFF`,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    )
}
