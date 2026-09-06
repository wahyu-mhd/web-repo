import {
  Database,
  File,
  LockKeyhole,
  Cloud,
  Radar,
  Server,
  GitBranch,
  Check,
  ArrowRight,
} from 'lucide-react';
export function ProjectArtwork({
  kind,
}: {
  kind: 'storage' | 'soc' | 'pipeline';
}) {
  if (kind === 'storage')
    return (
      <div className="project-art storage-art" aria-hidden="true">
        <div className="art-topline">
          <span>STORAGE / SYSTEM OVERVIEW</span>
          <LockKeyhole size={15} />
        </div>
        <div className="storage-flow">
          <div className="file-node">
            <File size={31} strokeWidth={1.3} />
            <span>Your file</span>
          </div>
          <span className="flow-line" />
          <div className="chunk-cluster">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i}>
                <LockKeyhole size={12} />
              </span>
            ))}
          </div>
          <span className="flow-line" />
          <div className="cloud-node">
            <Cloud size={40} strokeWidth={1.3} />
            <span>Object storage</span>
          </div>
        </div>
        <div className="art-caption">
          <span>Split. Encrypt. Store.</span>
          <span>AES-GCM / SHA-256</span>
        </div>
        <div className="art-footnote">
          <Database size={13} /> FastAPI + PostgreSQL{' '}
          <span>↳ Hosted on Raspberry Pi</span>
        </div>
      </div>
    );
  if (kind === 'soc')
    return (
      <div className="project-art soc-art" aria-hidden="true">
        <div className="art-topline">
          <span>OBSERVE / INVESTIGATE</span>
          <Radar size={16} />
        </div>
        <div className="soc-flow">
          <span>
            <Server size={24} />
            Endpoint
          </span>
          <div className="signal-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="radar-node">
            <Radar size={57} strokeWidth={1} />
          </span>
          <div className="signal-lines">
            <i />
            <i />
            <i />
          </div>
          <span>
            <span className="alert-dots">•••</span>Alerts
          </span>
        </div>
        <div className="art-caption">
          <span>Making the invisible visible.</span>
          <span>WAZUH SIEM</span>
        </div>
      </div>
    );
  return (
    <div className="project-art pipeline-art" aria-hidden="true">
      <div className="art-topline">
        <span>AUTOMATE / DELIVER</span>
        <GitBranch size={16} />
      </div>
      <div className="pipeline-flow">
        {['GitHub', 'Jenkins', 'Gradle'].map((name, i) => (
          <div key={name}>
            <span className="pipeline-node">
              {i === 0 ? (
                <GitBranch size={23} />
              ) : i === 1 ? (
                <Server size={23} />
              ) : (
                <Check size={23} />
              )}
            </span>
            <span>{name}</span>
            {i < 2 && <ArrowRight className="pipeline-arrow" size={20} />}
          </div>
        ))}
      </div>
      <div className="art-caption">
        <span>A path from trigger to build.</span>
        <span>CI / CD</span>
      </div>
    </div>
  );
}
