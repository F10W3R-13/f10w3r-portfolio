import { useState } from 'react'

import { Header } from '@/components/Header'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { img, type ProjectId } from '@/lib/data'
import { useLang } from '@/lib/lang'
import { Contact } from '@/sections/Contact'
import { Moodboard, type BoardItem } from '@/sections/Moodboard'
import { Opening } from '@/sections/Opening'
import { ProjectDialog } from '@/sections/ProjectDialog'
import { Record } from '@/sections/Record'
import { Work } from '@/sections/Work'

export default function App() {
  const { t } = useLang()
  const [project, setProject] = useState<ProjectId | null>(null)
  const [photo, setPhoto] = useState<BoardItem | null>(null)

  return (
    <>
      <Header />
      <main>
        <Opening />
        <Moodboard onOpenProject={setProject} onOpenPhoto={setPhoto} />
        <Work onOpen={setProject} />
        <Record />
        <Contact />
      </main>

      <ProjectDialog id={project} onClose={() => setProject(null)} />
      <Dialog open={!!photo} onOpenChange={(o) => !o && setPhoto(null)}>
        <DialogContent className="gap-3 p-3 sm:max-w-3xl">
          {photo?.src && <img src={img(photo.src)} alt={t(photo.cap)} className="w-full rounded-md" />}
          <DialogTitle className="px-1 text-base">{photo && t(photo.cap)}</DialogTitle>
          <DialogDescription className="sr-only">{photo && t(photo.cap)}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
