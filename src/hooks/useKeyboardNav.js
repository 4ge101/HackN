import { useEffect, useRef } from 'react'

export function useKeyboardNav(stories, onBookmark) {
  const indexRef = useRef(-1)

  useEffect(() => {
    function handleKey(e) {
      // don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const story = stories[indexRef.current]

      switch (e.key) {
        case 'j': {
          // move down
          indexRef.current = Math.min(indexRef.current + 1, stories.length - 1)
          const el = document.getElementById(`story-${stories[indexRef.current]?.id}`)
          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          highlightStory(stories[indexRef.current]?.id)
          break
        }
        case 'k': {
          // move up
          indexRef.current = Math.max(indexRef.current - 1, 0)
          const el = document.getElementById(`story-${stories[indexRef.current]?.id}`)
          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          highlightStory(stories[indexRef.current]?.id)
          break
        }
        case 'o': {
          // open story link
          if (story?.url) window.open(story.url, '_blank', 'noreferrer')
          break
        }
        case 'c': {
          // open comments
          if (story) window.location.href = `/item/${story.id}`
          break
        }
        case 'b': {
          // bookmark
          if (story && onBookmark) onBookmark(story)
          break
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [stories, onBookmark])
}

function highlightStory(id) {
  // remove old highlight
  document.querySelectorAll('.hn-story-active').forEach(el => {
    el.classList.remove('hn-story-active')
    el.style.background = 'transparent'
  })
  // add new highlight
  if (!id) return
  const el = document.getElementById(`story-${id}`)
  if (el) {
    el.classList.add('hn-story-active')
    el.style.background = 'rgba(255,133,0,0.06)'
  }
}