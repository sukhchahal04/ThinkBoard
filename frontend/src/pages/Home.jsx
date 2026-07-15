import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard';
import RateLimitUI from '../components/RateLimitUI';
import NotesNotFound from '../components/NotesNotFound';
import api from '../components/lib/axios'
import toast from 'react-hot-toast'

const Home = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes")
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load")
        }
      } finally {
        setLoading(false)
      }
    };

    fetchNotes();
  }, [])

  const handleNoteDeleted = (deletedId) => {
    setNotes((prev) => prev.filter((note) => note._id !== deletedId))
  }

  return (
    <div className='min-h-screen'>

      {isRateLimited && <RateLimitUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>loading notes..</div>}

        {!loading && !isRateLimited && notes.length === 0 && (
          <NotesNotFound />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} onDelete={handleNoteDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home