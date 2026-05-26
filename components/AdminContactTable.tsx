'use client'

import { useTransition } from 'react'
import { updateContactStatus } from '@/app/admin/_actions/contacts'
import type { Contact, ContactStatus } from '@/types'

const statusMeta: Record<ContactStatus, { label: string; className: string }> = {
  new: { label: '신규', className: 'bg-blue-50 text-blue-600' },
  read: { label: '확인', className: 'bg-gray-100 text-gray-600' },
  replied: { label: '답변완료', className: 'bg-green-50 text-green-600' },
}

const nextStatus: Record<ContactStatus, ContactStatus> = {
  new: 'read',
  read: 'replied',
  replied: 'new',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function ContactRow({ contact }: { contact: Contact }) {
  const [isPending, startTransition] = useTransition()
  const meta = statusMeta[contact.status]
  const next = nextStatus[contact.status]

  const handleStatusChange = () => {
    startTransition(() => {
      updateContactStatus(contact.id, next)
    })
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-apple-light/50 transition-colors">
      <td className="px-6 py-4 text-sm text-apple-black font-medium whitespace-nowrap">
        {contact.name}
      </td>
      <td className="px-6 py-4 text-sm text-apple-gray">{contact.email}</td>
      <td className="px-6 py-4 text-sm text-apple-gray">{contact.phone ?? '-'}</td>
      <td className="px-6 py-4 text-sm text-apple-gray max-w-xs">
        <p className="line-clamp-2">{contact.message}</p>
      </td>
      <td className="px-6 py-4 text-sm text-apple-gray whitespace-nowrap">
        {formatDate(contact.created_at)}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleStatusChange}
          disabled={isPending}
          className={`rounded-full text-xs font-medium px-3 py-1 transition-opacity hover:opacity-70 disabled:opacity-40 ${meta.className}`}
        >
          {meta.label}
        </button>
      </td>
    </tr>
  )
}

export default function AdminContactTable({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-16 text-apple-gray">
        <p className="text-lg">아직 접수된 문의가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-apple-light">
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                이메일
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                연락처
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                문의 내용
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                접수일시
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-apple-gray uppercase tracking-wider">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <ContactRow key={c.id} contact={c} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
