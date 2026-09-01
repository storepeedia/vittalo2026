import re

with open("src/components/admin/EditPackageModal.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'import { updatePackage } from "@/actions/admin/packages";',
    'import { updatePackage, createPackage } from "@/actions/admin/packages";'
)

content = content.replace(
    'export function EditPackageModal({ pkg, onClose }: { pkg: any; onClose: () => void }) {',
    'export function EditPackageModal({ pkg, onClose, mode = "edit" }: { pkg: any; onClose: () => void; mode?: "edit" | "duplicate" }) {'
)

content = content.replace(
    '''    try {
      await updatePackage(pkg.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update package");
    } finally {''',
    '''    try {
      if (mode === "duplicate") {
        await createPackage(formData);
      } else {
        await updatePackage(pkg.id, formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert(`Failed to ${mode === "duplicate" ? "duplicate" : "update"} package`);
    } finally {'''
)

content = content.replace(
    '<h2 className="text-xl font-bold text-gray-900">Edit Package: {pkg.title}</h2>',
    '<h2 className="text-xl font-bold text-gray-900">{mode === "duplicate" ? "Duplicate Package:" : "Edit Package:"} {pkg.title}</h2>'
)

content = content.replace(
    'defaultValue={pkg.title}',
    'defaultValue={mode === "duplicate" ? `${pkg.title} (Copy)` : pkg.title}'
)

content = content.replace(
    'defaultValue={pkg.priority}',
    'defaultValue={mode === "duplicate" ? "" : pkg.priority}'
)

content = content.replace(
    '{isSubmitting ? "Saving..." : "Save Changes"}',
    '{isSubmitting ? "Saving..." : (mode === "duplicate" ? "Create Duplicate" : "Save Changes")}'
)

with open("src/components/admin/EditPackageModal.tsx", "w") as f:
    f.write(content)
