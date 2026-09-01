import re

with open("src/components/admin/EditCampModal.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'import { updateCamp } from "@/actions/admin/camps";',
    'import { updateCamp, createCamp } from "@/actions/admin/camps";'
)

content = content.replace(
    'export function EditCampModal({ camp, onClose }: { camp: any; onClose: () => void }) {',
    'export function EditCampModal({ camp, onClose, mode = "edit" }: { camp: any; onClose: () => void; mode?: "edit" | "duplicate" }) {'
)

content = content.replace(
    '''    try {
      await updateCamp(camp.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update camp");
    } finally {''',
    '''    try {
      if (mode === "duplicate") {
        await createCamp(formData);
      } else {
        await updateCamp(camp.id, formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert(`Failed to ${mode === "duplicate" ? "duplicate" : "update"} camp`);
    } finally {'''
)

content = content.replace(
    '<h2 className="text-xl font-bold text-gray-900">Edit Camp: {camp.title}</h2>',
    '<h2 className="text-xl font-bold text-gray-900">{mode === "duplicate" ? "Duplicate Camp:" : "Edit Camp:"} {camp.title}</h2>'
)

content = content.replace(
    'defaultValue={camp.priority}',
    'defaultValue={mode === "duplicate" ? "" : camp.priority}'
)


with open("src/components/admin/EditCampModal.tsx", "w") as f:
    f.write(content)
