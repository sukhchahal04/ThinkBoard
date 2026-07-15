import { SquarePenIcon, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { formatDate } from './lib/utils'
import api from './lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/note/${note._id}`)
  }

  const openConfirm = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(true)
  }

  const closeConfirm = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(false)
  }

  const confirmDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await api.delete(`/notes/${note._id}`)
      toast.success('Note deleted')
      onDelete(note._id)
    } catch (error) {
      console.error('Failed to delete note:', error)
      toast.error('Failed to delete note')
    } finally {
      setShowConfirm(false)
    }
  }

  return (
    <>
      <Link to={`/note/${note._id}`}
        className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4
         border-solid border-[#00FF9D]'>
        <div className='card-body'>
          <h3 className='card-title text-base-content'>{note.title}</h3>
          <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
          <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
            <div className='flex items-center gap-1'>
              <button className='btn btn-ghost btn-xs' onClick={handleEdit}>
                <SquarePenIcon className='size-4' />
              </button>
              <button className='btn btn-ghost btn-xs text-error' onClick={openConfirm}>
                <Trash2Icon className='size-4' />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showConfirm && (
        <div className='modal modal-open' onClick={closeConfirm}>
          <div className='modal-box' onClick={(e) => e.stopPropagation()}>
            <h3 className='font-bold text-lg'>Delete note?</h3>
            <p className='py-4 text-base-content/70'>
              Are you sure you want to delete "{note.title}"? This action cannot be undone.
            </p>
            <div className='modal-action'>
              <button className='btn btn-ghost' onClick={closeConfirm}>
                Cancel
              </button>
              <button className='btn btn-error' onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NoteCard